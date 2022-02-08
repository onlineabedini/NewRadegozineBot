//import models
const StudentModel = require("../../../models/Student");

//import stateList
const stateList = require('../../stateList')

//import functions
const {sendQuestionText, sendMessageDetails} = require("../../sessions/similar/SimilarService");

//import buttons
const {answerCancelButton, confidenceButtons} = require("../../../buttons/similarButtons/answerButtons");

//import messages
const {enterYourAnswerAsVoice} = require("../../../messages/similarMessages");
const {
    deleteMessageConfidence, messageRemoved, messageDeletedBefore, tryDeletingMessageAgain,
    deleteMessageRequestCanceled
} = require("../../../messages/similarMessages");

//our variables
let messageId;
let chatId;
let studentQuestion;

module.exports = new class SimilarService {
    async answer(ctx, next) {
        // const question = ctx.update.callback_query.message.text.split("❓")[1].split("سوال :")[1]
        // const student = await StudentModel.findOne({userMessageText : question });
        const tempMessage = await ctx.reply(enterYourAnswerAsVoice, answerCancelButton);
        sendQuestionText(ctx.update.callback_query.message.text.split("❓")[1]);
        sendMessageDetails(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id,
            tempMessage.message_id
        );
        ctx.session.state = stateList.answer;
    }

    async delete(ctx, next) {
        messageId = ctx.update.callback_query.message.message_id;
        chatId = ctx.update.callback_query.message.chat.id;
        studentQuestion = ctx.update.callback_query.message.text;
        ctx.reply(deleteMessageConfidence, confidenceButtons);
    }

    async yes(ctx, next) {
        if (studentQuestion) {
            await StudentModel.findOneAndDelete({
                userMessageText: studentQuestion.split("❓")[1].split(":")[1],
            });
            try {
                await ctx.telegram.deleteMessage(chatId, messageId);
                await ctx.telegram.deleteMessage(
                    ctx.update.callback_query.message.chat.id,
                    ctx.update.callback_query.message.message_id
                );
                const tempMessage = await ctx.reply(messageRemoved);
                setTimeout(() => {
                    ctx.telegram.deleteMessage(
                        tempMessage.chat.id,
                        tempMessage.message_id
                    );
                }, 1500);
            } catch (err) {
                console.log(err);
                await ctx.telegram.deleteMessage(
                    ctx.update.callback_query.message.chat.id,
                    ctx.update.callback_query.message.message_id
                );
                const tempMessage = await ctx.reply(messageDeletedBefore);
                setTimeout(() => {
                    ctx.telegram.deleteMessage(
                        tempMessage.chat.id,
                        tempMessage.message_id
                    );
                }, 1500);
            }
        } else {
            await ctx.telegram.deleteMessage(
                ctx.update.callback_query.message.chat.id,
                ctx.update.callback_query.message.message_id
            );
            const tempMessage = await ctx.reply(tryDeletingMessageAgain);
            setTimeout(() => {
                ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
            }, 1500);
        }
    }

    async no(ctx, next) {
        await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
        );
        const tempMessage = await ctx.reply(deleteMessageRequestCanceled);
        setTimeout(() => {
            ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
        }, 1500);
    }

    async cancel(ctx, next) {
        await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
        );
    }
}