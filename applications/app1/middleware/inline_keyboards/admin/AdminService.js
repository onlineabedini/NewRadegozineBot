const PlanModel = require("../../../models/Plan");
const ProStudentModel = require("../../../models/ProStudent");
const stateList = require("../../stateList");
const {
    plans_buttons,
} = require("../../../buttons/similar_buttons/plans_buttons");
const {
    manage_pro_students_buttons,
} = require("../../../buttons/admin_buttons/manage_pro_students_buttons");
const {
    cancel_button,
} = require("../../../buttons/similar_buttons/cancel_button");
const {
    confidence_buttons,
} = require("../../../buttons/similar_buttons/confidence_buttons");
const {
    do_you_want_to_remove_this_student_message,
    select_your_plan_message,
    no_plan_found_message,
    this_student_has_already_been_removed_message,
    do_you_want_to_remove_this_plan_message,
    do_you_want_to_accept_this_student_message,
    are_you_sure_you_dont_want_to_accept_this_student_message,
    do_you_want_to_accept_this_adviser_message,
    do_you_want_to_remove_this_adviser_message
} = require("../../../messages/adminMessages");
const{ enter_your_message} = require("../../../messages/similarMessages");

module.exports = new (class AdminService {
    async removeStudent(ctx, matches) {
        const studentId = matches[0].split("_")[2];
        ctx.reply(do_you_want_to_remove_this_student_message, confidence_buttons);
        ctx.session.studentId = studentId;
        ctx.session.state = stateList.removeStudent;
    }

    async updateStudent(ctx, matches) {
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
    }

    async removePlan(ctx, matches) {
        const planId = matches[0].split("_")[2];
        ctx.reply(do_you_want_to_remove_this_plan_message, confidence_buttons);
        ctx.session.planId = planId;
        ctx.session.state = stateList.removePlan;
    }

    async updatePlan(ctx, matches) {
        ctx.reply("این بخش در حال انجام است.");
    }

    async acceptStudent(ctx, matches) {
        const studentId = matches[0].split("_")[1];
        ctx.reply(do_you_want_to_accept_this_student_message, confidence_buttons);
        ctx.session.studentId = studentId;
        ctx.session.state = stateList.acceptStudent;
    }

    async rejectStudent(ctx, matches) {
        const studentId = matches[0].split("_")[1];
        ctx.reply(are_you_sure_you_dont_want_to_accept_this_student_message, confidence_buttons);
        ctx.session.studentId = studentId;
        ctx.session.state = stateList.rejectStudent;
    }

    async sendMessage(ctx, matches) {
        const studentId = matches[0].split("_")[1];
        const student = await ProStudentModel.findById(studentId);
        if (student) {
            const userChatId = student.userChatId;
            ctx.session.stateData = {
                ...ctx.session.stateData, userChatId,
            };
            ctx.session.state = stateList.sendMessageForRegStudents;
            await ctx.reply(enter_your_message, cancel_button);
        } else {
            ctx.reply(this_student_has_already_been_removed_message);
        }
    }

    async acceptAdviser(ctx, matches) {
        const regAdviserId = matches[0].split("_")[2];
        await ctx.reply(do_you_want_to_accept_this_adviser_message, confidence_buttons);
        ctx.session.regAdviserId = regAdviserId;
        ctx.session.state = stateList.acceptAdviser;
    }

    async rejectAdviser(ctx, matches) {
        const regAdviserId = matches[0].split("_")[2];
        await ctx.reply(do_you_want_to_remove_this_adviser_message, confidence_buttons);
        ctx.session.regAdviserId = regAdviserId;
        ctx.session.state = stateList.rejectAdviser;
    }
})();
