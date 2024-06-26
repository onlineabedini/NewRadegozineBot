const ProStudentModel = require("../../models/ProStudent");
const state_list = require("../state_list");

const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {enter_your_message} = require("../../messages/similar_messages");
const {this_student_has_already_been_removed_message} = require("../../messages/admin_messages");

module.exports = {
    SEND_MESSAGE: async (ctx, matches) => {
        const student_id = matches[0].split("_")[2];
        const student = await ProStudentModel.findById(student_id);
        if (student) {
            const chat_id = student.chat_id;
            ctx.session.state_data = {
                ...ctx.session.state_data, chat_id,
            };
            ctx.session.state = state_list.send_message_for_reg_students;
            await ctx.reply(enter_your_message, cancel_button);
        } else {
            ctx.reply(this_student_has_already_been_removed_message);
        }
    },
}