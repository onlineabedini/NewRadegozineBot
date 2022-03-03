const ProStudentModel = require("../../models/ProStudent");
const PlanModel = require("../../models/Plan");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {
    select_an_item_message,
    sorry_your_information_was_not_found,
    something_went_wrong,
    enter_full_name_message
} = require("../../messages/similar_messages");
const {info_buttons} = require("../../buttons/student_buttons/info_buttons");
const {student_info} = require("../../messages/student_messages");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

module.exports = {
    [all_buttons_text.my_info]: async (ctx) => {
        ctx.reply(select_an_item_message, info_buttons);
    },
    [all_buttons_text.show_my_info]: async (ctx) => {
        const student = await ProStudentModel.findOne({
            userName: ctx.chat.username,
        });
        const plan = await PlanModel.findById(student.plan_id);
        plan ? student ? ctx.reply(student_info(student, plan.title)) : ctx.reply(sorry_your_information_was_not_found) : ctx.reply(something_went_wrong);
    },
    [all_buttons_text.update_my_info]: async (ctx) => {
        ctx.session.status = "update";
        ctx.session.state = state_list.get_pro_student_fullname;
        ctx.reply(enter_full_name_message, cancel_button);
    }
}