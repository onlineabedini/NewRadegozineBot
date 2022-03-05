const state_list = require("../state_list");

const {confidence_buttons} = require("../../buttons/similar_buttons/confidence_buttons");

const {do_you_want_to_remove_this_plan_message, enter_plan_title_message} = require("../../messages/admin_messages");
const { cancel_button } = require("../../buttons/similar_buttons/cancel_button");

module.exports = {
    UPDATE_PLAN: async (ctx, matches) => {
        const plan_id = matches[0].split("_")[2];
        ctx.session.plan_id = plan_id;
        ctx.session.status = "update";
        ctx.session.state = state_list.get_plan_title;
        ctx.reply(enter_plan_title_message , cancel_button)
    },
    REMOVE_PLAN: async (ctx, matches) => {
        const plan_id = matches[0].split("_")[2];
        ctx.reply(do_you_want_to_remove_this_plan_message, confidence_buttons);
        ctx.session.plan_id = plan_id;
        ctx.session.state = state_list.remove_plan;
    },
}