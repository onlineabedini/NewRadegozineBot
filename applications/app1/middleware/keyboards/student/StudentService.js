const ProStudentModel = require('../../../models/ProStudent');
const PlanModel = require('../../../models/Plan');

const stateList = require('../../stateList')
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {contact_with_pro_advisers} = require("../../../buttons/student_buttons/contact_with_pro_advisers");
const {
    select_an_item_message, enter_full_name_message, something_went_wrong, sorry_your_information_was_not_found
} = require("../../../messages/similarMessages");
const {info_buttons} = require("../../../buttons/student_buttons/info_buttons");
const {student_info, ask_question_from_pro_adviser_message} = require("../../../messages/studentMessages");

module.exports = new class StudentService {
    async my_info(ctx, next) {
        ctx.reply(select_an_item_message, info_buttons);
    }

    async show_my_info(ctx, next) {
        const student = await ProStudentModel.findOne({userName: ctx.chat.username});
        const plan = await PlanModel.findById(student.userPlanId);
        plan ? student ? ctx.reply(student_info(student, plan.planTitle)) : ctx.reply(sorry_your_information_was_not_found) : ctx.reply(something_went_wrong);

    }

    async update_my_info(ctx, next) {
        ctx.session.status = "update"
        ctx.session.state = stateList.getProStudentFullName
        ctx.reply(enter_full_name_message, cancel_button)
    }

    async ask_question_from_pro_adviser(ctx, next) {
        ctx.reply(ask_question_from_pro_adviser_message, contact_with_pro_advisers)
    }
}