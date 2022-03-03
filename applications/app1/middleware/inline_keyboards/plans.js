const AdminModel = require("../../models/Admin");
const state_list = require("../state_list");

const {dont_change} = require("../../buttons/similar_buttons/dont_change");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {enter_pro_student_full_name_message} = require("../../messages/admin_messages");
const {enter_full_name_message} = require("../../messages/similar_messages");

module.exports = {
    PLAN: async (ctx, matches) => {
        await ctx.telegram.deleteMessage(ctx.session.chatId, ctx.session.messageId);
        const planId = matches[0].split("_")[1];
        ctx.session.stateData = {
            ...ctx.session.stateData, planId,
        };
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
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
    },
}