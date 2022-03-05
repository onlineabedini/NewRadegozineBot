const QuestionModel = require("../../models/Question");
const state_list = require("../state_list");

const {
    enter_your_answer_as_voice_message,
    this_user_no_longer_exists_message,
    are_you_sure_you_want_to_remove_this_question_message
} = require("../../messages/similar_messages");

const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {confidence_buttons} = require("../../buttons/similar_buttons/confidence_buttons");

module.exports = {
    ANSWER_QUESTION: async (ctx, matches) => {
        const question_id = matches[0].split("_")[2];
        const question = await QuestionModel.findById(question_id);
        if (question) {
            ctx.session.state = state_list.answer;
            ctx.session.question = question;
            ctx.reply(enter_your_answer_as_voice_message, cancel_button);
        } else {
            ctx.reply(this_user_no_longer_exists_message);
        }
    },
    DELETE_QUESTION: async (ctx, matches) => {
        const question_id = matches[0].split("_")[2];
        ctx.reply(are_you_sure_you_want_to_remove_this_question_message, confidence_buttons);
        ctx.session.question_id = question_id;
        ctx.session.state = state_list.remove_question;
    },
    TAG_PERSON : async (ctx, matches) => {
        const question_id = matches[0].split("_")[2];
        const question = await QuestionModel.findById(question_id);
        if (question) {
            ctx.session.state = state_list.tag_person;
            ctx.session.question_id = question_id;
            ctx.reply("لطفا نام شخصی که چسباندن آن به این سوال را دارید وارد کنید : ", cancel_button);
        } else {
            ctx.reply(this_user_no_longer_exists_message);
        }
    },
}