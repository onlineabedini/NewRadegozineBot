const ContentModel = require("../../models/Content");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {content_production_buttons} = require("../../buttons/admin_buttons/content_production_buttons");
const {update_and_remove_content_buttons} = require("../../buttons/admin_buttons/update_remove_content");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {select_an_item_message} = require("../../messages/similar_messages");
const {
    content_caption, enter_content_title_message, there_is_no_registered_title, there_is_no_registered_title_message,
    no_title_registered_recently_message
} = require("../../messages/admin_messages");
const {auth_button} = require("../../buttons/similar_buttons/auth_button");
const {content_production_titles_list_message} = require("../../messages/adviser_messages");
const {send_content_button} = require("../../buttons/similar_buttons/send_content_button");

module.exports = {
    [all_buttons_text.manage_content_production]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, content_production_buttons);
    },
    [all_buttons_text.add_content_title]: async (ctx) => {
        ctx.session.state = state_list.get_content_title;
        ctx.session.status = "create";
        await ctx.reply(enter_content_title_message, cancel_button);
    },
    [all_buttons_text.show_update_remove_content]: async (ctx) => {
        ctx.session.state = undefined;
        const contents = await ContentModel.find();
        if (contents.length !== 0) {
            contents.forEach((content) => {
                ctx.reply(content_caption(content), {
                    reply_markup: update_and_remove_content_buttons(content._id),
                });
            });
        } else {
            ctx.reply(there_is_no_registered_title_message, content_production_buttons);
        }
    }, [all_buttons_text.show_content_production_titles_list]: async (ctx) => {
        ctx.session.state = undefined;
        const contents = await ContentModel.find();
        if (contents.length !== 0) {
            contents.forEach((content) => {
                ctx.reply(content_production_titles_list_message(content) , send_content_button )
            });
        } else {
            ctx.reply(no_title_registered_recently_message, auth_button(ctx))
        }
    }
}