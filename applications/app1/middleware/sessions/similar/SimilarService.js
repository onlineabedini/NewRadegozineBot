//import models
const StudentModel = require("../../../models/Student");

//import messages
const {somethingWentWrong, voiceCaption, answerRegistrated} = require("../../../messages/similarMessages");
const {yourQuestionAnswered} = require("../../../messages/studentMessages");
const {onlyVoiceMessage} = require("../../../messages/similarMessages");

//our variables

let questionText;
let messageDatails;


const mainInfo = {
    MainAdminUsername: "radegozine_manager",
    ChannelChatId: -1001312069430,
}

//define SimilarService class
// create an instance
module.exports = new class SimilarService {
    async answer(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.update.callback_query?.data &&
            ctx.update.callback_query.data !== "CANCEL"
        ) {
            const tempMessage = await ctx.reply(somethingWentWrong);
            await ctx.telegram.deleteMessage(messageDatails[0], messageDatails[2]);
            setTimeout(() => {
                ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
            }, 1500);
        } else if (ctx.update.callback_query?.data === "CANCEL") {
            await ctx.telegram.deleteMessage(
                ctx.update.callback_query.message.chat.id,
                ctx.update.callback_query.message.message_id
            );
        } else if (ctx.message?.voice) {
            await ctx.telegram.sendVoice(
                mainInfo.ChannelChatId,
                ctx.message.voice.file_id,
                {caption: voiceCaption(questionText[0])}
            );
            const tempMessage = await ctx.reply(answerRegistrated);
            const student = await StudentModel.findOne({
                userMessageText: questionText[0].split(":")[1],
            });
            await ctx.telegram.sendMessage(
                student.userChatId,
                yourQuestionAnswered
            );
            await ctx.telegram.deleteMessage(
                ctx.message.chat.id,
                ctx.message.message_id
            );
            await ctx.telegram.deleteMessage(messageDatails[0], messageDatails[2]);
            await ctx.telegram.deleteMessage(messageDatails[0], messageDatails[1]);
            setTimeout(() => {
                ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
            }, 3000);
            await StudentModel.findOneAndDelete({
                userMessageText: questionText[0].split(":")[1],
            });
        } else {
            await ctx.reply(onlyVoiceMessage);
            next();
        }
    }

    sendQuestionText(studentQuestionText) {
        questionText = [];
        questionText.push(studentQuestionText);
    };

    sendMessageDetails = (chatId, messageId1, messageId2) => {
        messageDatails = [];
        messageDatails.push(chatId, messageId1, messageId2);
    }

}
