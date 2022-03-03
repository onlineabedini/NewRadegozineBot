const AdviserModel = require("../../models/Adviser");
const QuestionModel = require("../../models/Question");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {answer_buttons} = require("../../buttons/similar_buttons/answer_buttons");

const {show_advisers_questions_list_message} = require("../../messages/admin_messages");
const {
    empty_list_message,
    questions_list_title_message,
    student_info_message,
    no_questions_to_show_message
} = require("../../messages/similar_messages");

module.exports = {
    [all_buttons_text.show_advisers_questions_list]: async (ctx) => {
        ctx.session.state = undefined;
        const advisersData = await AdviserModel.find();
        const advisersIds = advisersData.map((adviser) => adviser.id);

        if (advisersIds.length !== 0) {
            await ctx.reply(show_advisers_questions_list_message);
            for (const item in advisersIds) {
                let adviser = await AdviserModel.findOne({_id: advisersIds[item]});
                let messagesIds = adviser.messagesIds;
                if (messagesIds.length !== 0) {
                    for (const item in messagesIds) {
                        await ctx.telegram.forwardMessage(ctx.message.chat.id, adviser.chat_id, messagesIds[item]);
                    }
                    return;
                }
            }
            await ctx.reply(empty_list_message);
        } else {
            await ctx.reply(empty_list_message);
        }
    },
    [all_buttons_text.show_users_questions_list]: async (ctx) => {
        ctx.session.state = undefined;
        const questions = await QuestionModel.find();
        if (questions.length !== 0) {
            await ctx.reply(questions_list_title_message);
            questions.forEach((question) => {
                ctx.reply(student_info_message(question), answer_buttons(question._id));
            });
        } else {
            ctx.reply(no_questions_to_show_message);
        }
    },
}