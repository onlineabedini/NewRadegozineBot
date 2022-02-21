const {
    cancel_button,
} = require("../../../buttons/similar_buttons/cancel_button");
const stateList = require("../../stateList");
const {enter_payment_picture_message} = require("../../../messages/studentMessages");

module.exports = new (class StudentService {
    async send_payment_picture(ctx, matches) {
        const planId = matches[0].split("_")[1];
        ctx.session.stateData = {
            ...ctx.session.stateData, planId,
        };
        ctx.session.state = stateList.getProStudentPaymentPicture;
        ctx.reply(enter_payment_picture_message, cancel_button);
    }
})();
