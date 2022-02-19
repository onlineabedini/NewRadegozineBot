const stateList = require('../../stateList')
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {contact_with_pro_advisers} = require("../../../buttons/student_buttons/contact_with_pro_advisers");

module.exports = new class StudentService {
    async update_my_info(ctx, next) {
        ctx.session.status = "update"
        ctx.session.state = stateList.getProStudentFullName
        ctx.reply("لطفا نام و نام خانوادگی خود را وارد نمایید : ", cancel_button)
    }

    async ask_question_from_pro_adviser(ctx, next) {
        ctx.reply("برای ارتباط با هر مشاور روی دکمه ی مربوط به آن کلیک نمایید : " , contact_with_pro_advisers)
    }
}