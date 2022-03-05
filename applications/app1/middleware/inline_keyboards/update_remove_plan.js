const state_list = require("../state_list");

const {confidence_buttons} = require("../../buttons/similar_buttons/confidence_buttons");

const {do_you_want_to_remove_this_plan_message} = require("../../messages/admin_messages");

module.exports = {
    UPDATE_PLAN: async (ctx, matches) => {
        ctx.reply("این بخش در حال انجام است.");
    },
    REMOVE_PLAN: async (ctx, matches) => {
        const plan_id = matches[0].split("_")[2];
        ctx.reply(do_you_want_to_remove_this_plan_message, confidence_buttons);
        ctx.session.plan_id = plan_id;
        ctx.session.state = state_list.remove_plan;
    },
}