const ContentModel = require("../../models/Content");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {content_production_buttons} = require("../../buttons/admin_buttons/content_production_buttons");
const {update_and_remove_content_buttons} = require("../../buttons/admin_buttons/update_remove_content");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {select_an_item_message} = require("../../messages/similar_messages");
const {content_caption} = require("../../messages/admin_messages");

module.exports = {
    [all_buttons_text.manage_content_production]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, content_production_buttons);
    },
    [all_buttons_text.add_content_title]: async (ctx) => {
        ctx.session.state = state_list.get_content_title;
        ctx.session.status = "create";
        await ctx.reply("لطفا عنوان مورد نظر حهت تولید محتوا را وارد نمایید :", cancel_button);
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
            ctx.reply("عنوانی برای تولید محتوا ثبت نشده است.", content_production_buttons);
        }
    },
}