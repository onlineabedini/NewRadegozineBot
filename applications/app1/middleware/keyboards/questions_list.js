const AdminModel = require("../../models/Admin");
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
const {answer_buttons_for_admins} = require("../../buttons/similar_buttons/answer_buttons_for_admins");

module.exports = {
    [all_buttons_text.show_advisers_questions_list]: async (ctx) => {
        ctx.session.state = undefined;
        const advisers = await AdviserModel.find();
        const advisers_ids = advisers.map((adviser) => adviser.id);

        if (advisers_ids.length !== 0) {
            await ctx.reply(show_advisers_questions_list_message);
            for (const item in advisers_ids) {
                let adviser = await AdviserModel.findOne({_id: advisers_ids[item]});
                let messages_ids = adviser.messages_ids;
                if (messages_ids.length !== 0) {
                    for (const item in messages_ids) {
                        await ctx.telegram.forwardMessage(ctx.message.chat.id, adviser.chat_id, messages_ids[item]);
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
        const admin = await AdminModel.find({username: ctx.chat.username})
        if (admin.length !== 0) {
            const questions = await QuestionModel.find();
            if (questions.length !== 0) {
                await ctx.reply(questions_list_title_message);
                questions.forEach((question) => {
                    ctx.reply(student_info_message(question), answer_buttons_for_admins(question._id));
                });
            } else {
                ctx.reply(no_questions_to_show_message);
            }
        } else {
            const questions = await QuestionModel.find();
            if (questions.length !== 0) {
                await ctx.reply(questions_list_title_message);
                questions.forEach((question) => {
                    ctx.reply(student_info_message(question), answer_buttons(question._id));
                });
            } else {
                ctx.reply(no_questions_to_show_message);
            }
        }


    },
}