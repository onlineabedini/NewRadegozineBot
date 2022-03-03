const ProStudentModel = require("../../models/ProStudent");
const PlanModel = require("../../models/Plan");
const state_list = require("../state_list");

const {plans_buttons} = require("../../buttons/similar_buttons/plans_buttons");
const {manage_pro_students_buttons} = require("../../buttons/admin_buttons/manage_pro_students_buttons");
const {confidence_buttons} = require("../../buttons/similar_buttons/confidence_buttons");

const {
    select_your_plan_message,
    no_plan_found_message,
    this_student_has_already_been_removed_message,
    do_you_want_to_remove_this_student_message
} = require("../../messages/admin_messages");

module.exports = {
    UPDATE_STUDENT: async (ctx, matches) => {
        ctx.session = undefined;
        const studentId = matches[0].split("_")[2];
        const student = await ProStudentModel.findById(studentId);
        if (student) {
            const plans = await PlanModel.find();
            if (plans.length !== 0) {
                const tempMessage = await ctx.reply(select_your_plan_message, plans_buttons(plans));
                ctx.session.status = "update";
                ctx.session.student = student;
                ctx.session.chatId = tempMessage.chat.id;
                ctx.session.messageId = tempMessage.message_id;
            } else await ctx.reply(no_plan_found_message, manage_pro_students_buttons);
        } else {
            ctx.session = undefined;
            ctx.reply(this_student_has_already_been_removed_message);
        }
    }, REMOVE_STUDENT: async (ctx, matches) => {
        const studentId = matches[0].split("_")[2];
        ctx.reply(do_you_want_to_remove_this_student_message, confidence_buttons);
        ctx.session.studentId = studentId;
        ctx.session.state = state_list.remove_student;
    },
}