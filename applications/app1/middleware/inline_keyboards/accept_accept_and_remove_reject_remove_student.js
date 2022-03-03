const state_list = require("../state_list");

const {
    do_you_want_to_accept_this_student_message,
    are_you_sure_you_dont_want_to_accept_this_student_message
} = require("../../messages/admin_messages");

const {confidence_buttons} = require("../../buttons/similar_buttons/confidence_buttons");

module.exports = {
    ACC: async (ctx, matches) => {
        const studentId = matches[0].split("_")[1];
        ctx.reply(do_you_want_to_accept_this_student_message, confidence_buttons);
        ctx.session.studentId = studentId;
        ctx.session.state = state_list.accept_student;
    },
    REJ: async (ctx, matches) => {
        const studentId = matches[0].split("_")[1];
        ctx.reply(are_you_sure_you_dont_want_to_accept_this_student_message, confidence_buttons);
        ctx.session.studentId = studentId;
        ctx.session.state = state_list.reject_student;
    },
    DEL: async (ctx, matches) => {
        const studentId = matches[0].split("_")[1];
        ctx.reply("آیا از پذیرش این دانش آموز اطمینان دارید ؟", confidence_buttons);
        ctx.session.studentId = studentId;
        ctx.session.state = state_list.delete_student;
    },
}