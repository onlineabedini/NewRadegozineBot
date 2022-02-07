//import models
const Student = require("../../../models/Student");

//import stateList
const stateList = require('../../stateList')

//import functions
const {sendQuestionText, sendMessageDetails} = require("../../sessions/adviser/AdviserService");

//import buttons
const {answerCancelButton, confidenceButtons} = require("../../../buttons/similarButtons/answerButtons");

//import messages
const {enterAnswerAsVoice} = require("../../../messages/adviserMessages");
const {
    deleteMessageConfidence, messageRemoved, messageDeletedBefore, tryDeletingMessageAgain,
    deleteMessageRequestCanceled
} = require("../../../messages/similarMessages");

//our variables
let MessageId;
let ChatId;
let StudentQuestion;

module.exports = new class SimilarService {
    async answer(ctx, next) {
        const tempMessage = await ctx.reply(enterAnswerAsVoice, answerCancelButton);
        sendQuestionText(ctx.update.callback_query.message.text.split("❓")[1]);
        sendMessageDetails(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id,
            tempMessage.message_id
        );
        ctx.session.state = stateList.answer;
    }

    async delete(ctx, next) {
        MessageId = ctx.update.callback_query.message.message_id;
        ChatId = ctx.update.callback_query.message.chat.id;
        StudentQuestion = ctx.update.callback_query.message.text;
        ctx.reply(deleteMessageConfidence, confidenceButtons);
    }

    async yes(ctx, next) {
        if (StudentQuestion) {
            await Student.findOneAndDelete({
                MessageText: StudentQuestion.split("❓")[1].split(":")[1],
            });
            try {
                await ctx.telegram.deleteMessage(ChatId, MessageId);
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
                }, 3000);
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
                }, 3000);
            }
        } else {
            await ctx.telegram.deleteMessage(
                ctx.update.callback_query.message.chat.id,
                ctx.update.callback_query.message.message_id
            );
            const tempMessage = await ctx.reply(tryDeletingMessageAgain);
            setTimeout(() => {
                ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
            }, 3000);
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
        }, 3000);
    }

    async cancel(ctx, next) {
        await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
        );
    }
}