const state_list = require("../state_list");

const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {confidence_buttons} = require("../../buttons/similar_buttons/confidence_buttons");

const {do_you_want_to_remove_this_plan_message, enter_content_title_message} = require("../../messages/admin_messages");

module.exports = {
    UPDATE_CONTENT: async (ctx, matches) => {
        ctx.session.content_id = matches[0].split("_")[2];
        ctx.session.status = "update";
        ctx.session.state = state_list.get_content_title;
        ctx.reply(enter_content_title_message, cancel_button);
    },
    REMOVE_CONTENT: async (ctx, matches) => {
        const content_id = matches[0].split("_")[2];
        ctx.reply(do_you_want_to_remove_this_plan_message, confidence_buttons);
        ctx.session.content_id = content_id;
        ctx.session.state = state_list.remove_content;
    },
}