const AdminModel = require("../../../models/Admin");
const QuestionerModel = require('../../../models/Questioner');
const stateList = require('../../stateList')
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {confidence_buttons} = require("../../../buttons/similar_buttons/confidence_buttons");
const {dont_change} = require("../../../buttons/similar_buttons/dont_change");
const {
    enter_full_name_message, enter_your_answer_as_voice_message, are_you_sure_you_want_to_remove_this_question_message
,this_user_no_longer_exists_message} = require("../../../messages/similarMessages");
const {enter_pro_student_full_name_message} = require("../../../messages/adminMessages");
module.exports = new class SimilarService {
    async selectPlan(ctx, matches) {
        await ctx.telegram.deleteMessage(ctx.session.chatId, ctx.session.messageId);
        const planId = matches[0].split("_")[1];
        ctx.session.stateData = {
            ...ctx.session.stateData, planId,
        };
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        if (admin) {
            if (ctx.session.status === "update") {
                await ctx.reply(enter_pro_student_full_name_message, dont_change);
                ctx.session.state = stateList.getProStudentFullNameFromAdmin;
            } else {
                await ctx.reply(enter_pro_student_full_name_message, cancel_button);
                ctx.session.state = stateList.getProStudentFullNameFromAdmin;
            }
        } else {
            ctx.session.state = stateList.getProStudentFullName;
            ctx.reply(enter_full_name_message, cancel_button);
        }
    }

    async answer(ctx, matches) {
        const questionerId = matches[0].split("_")[1];
        const questioner = await QuestionerModel.findById(questionerId);
        if (questioner) {
            ctx.session.state = stateList.answer
            ctx.session.questioner = questioner
            ctx.reply(enter_your_answer_as_voice_message, cancel_button);
        } else {
            ctx.reply(this_user_no_longer_exists_message)
        }
    }

    async delete(ctx, matches) {
        const questionerId = matches[0].split("_")[1];
        ctx.reply(are_you_sure_you_want_to_remove_this_question_message, confidence_buttons)
        ctx.session.questionerId = questionerId
        ctx.session.state = stateList.removeQuestion
    }

}