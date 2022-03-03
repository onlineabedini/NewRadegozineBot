const state_list = require("../state_list");

const {enter_payment_picture_message} = require("../../messages/student_messages");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

module.exports = {
    SENDPAYPIC: async (ctx, matches) => {
        const planId = matches[0].split("_")[1];
        ctx.session.stateData = {
            ...ctx.session.stateData, planId,
        };
        ctx.session.state = state_list.get_pro_student_payment_picture;
        ctx.reply(enter_payment_picture_message, cancel_button);
    },
}