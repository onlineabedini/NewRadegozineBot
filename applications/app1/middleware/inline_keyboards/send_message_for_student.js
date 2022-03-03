const ProStudentModel = require("../../models/ProStudent");
const state_list = require("../state_list");

const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {enter_your_message} = require("../../messages/similar_messages");
const {this_student_has_already_been_removed_message} = require("../../messages/admin_messages");

module.exports = {
    SENDMSG: async (ctx, matches) => {
        const studentId = matches[0].split("_")[1];
        const student = await ProStudentModel.findById(studentId);
        if (student) {
            const chat_id = student.chat_id;
            ctx.session.stateData = {
                ...ctx.session.stateData, chat_id,
            };
            ctx.session.state = state_list.send_message_for_reg_students;
            await ctx.reply(enter_your_message, cancel_button);
        } else {
            ctx.reply(this_student_has_already_been_removed_message);
        }
    },
}