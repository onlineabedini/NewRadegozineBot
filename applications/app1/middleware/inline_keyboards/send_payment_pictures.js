const state_list = require("../state_list");

const {enter_payment_picture_message} = require("../../messages/student_messages");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

module.exports = {
    SEND_PAYMENT_PICTURE: async (ctx, matches) => {
        const student_id = matches[0].split("_")[3];
        ctx.session.state_data = {
            ...ctx.session.state_data, student_id,
        };
        ctx.session.state = state_list.get_pro_student_payment_picture;
        ctx.reply(enter_payment_picture_message, cancel_button);
    },
}