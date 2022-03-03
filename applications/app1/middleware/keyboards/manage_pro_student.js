const ProStudentModel = require("../../models/ProStudent");
const PlanModel = require("../../models/Plan");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {select_an_item_message} = require("../../messages/similar_messages");
const {manage_pro_students_buttons} = require("../../buttons/admin_buttons/manage_pro_students_buttons");
const {
    pro_student_caption, no_student_found_message, select_your_plan_message, no_plan_found_message
} = require("../../messages/admin_messages");
const {update_remove_student_buttons} = require("../../buttons/admin_buttons/update_remove_student_buttons");
const {plans_buttons} = require("../../buttons/similar_buttons/plans_buttons");

module.exports = {
    [all_buttons_text.manage_pro_students]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, manage_pro_students_buttons);
    },
    [all_buttons_text.add_student]: async (ctx) => {
        ctx.session = undefined;
        const plans = await PlanModel.find();
        if (plans.length !== 0) {
            const tempMessage = await ctx.reply(select_your_plan_message, plans_buttons(plans));
            ctx.session.chatId = tempMessage.chat.id;
            ctx.session.messageId = tempMessage.message_id;
        } else await ctx.reply(no_plan_found_message, manage_pro_students_buttons);
    },
    [all_buttons_text.show_update_remove_students]: async (ctx) => {
        ctx.session.state = undefined;
        const students = await ProStudentModel.find();
        if (students.length !== 0) {
            students.forEach(async (student) => {
                ctx.reply(await pro_student_caption(student), update_remove_student_buttons(student._id));
            });
        } else {
            await ctx.reply(no_student_found_message, manage_pro_students_buttons);
        }
    },
}