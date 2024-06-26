const AdminModel = require("../../models/Admin");
const state_list = require("../state_list");

const {dont_change} = require("../../buttons/similar_buttons/dont_change");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {enter_pro_student_full_name_message} = require("../../messages/admin_messages");
const {enter_full_name_message, this_button_has_expired_message} = require("../../messages/similar_messages");

module.exports = {
    PLAN: async (ctx, matches) => {
        if (ctx.session.chat_id && ctx.session.message_id) {
            await ctx.telegram.deleteMessage(ctx.session.chat_id, ctx.session.message_id);
            ctx.session = undefined;
            const plan_id = matches[0].split("_")[1];
            ctx.session.state_data = {
                ...ctx.session.state_data, plan_id,
            };
            const admin = await AdminModel.findOne({username: ctx.chat.username});
            if (admin) {
                if (ctx.session.status === "update") {
                    await ctx.reply(enter_pro_student_full_name_message, dont_change);
                    ctx.session.state = state_list.get_pro_student_fullname_from_admin;
                } else {
                    await ctx.reply(enter_pro_student_full_name_message, cancel_button);
                    ctx.session.state = state_list.get_pro_student_fullname_from_admin;
                }
            } else {
                ctx.session.state = state_list.get_pro_student_fullname;
                ctx.reply(enter_full_name_message, cancel_button);
            }
        } else {
            ctx.reply(this_button_has_expired_message)
        }

    },
}