//import models
const StudentModel = require("../../../models/Student");
const ChannelModel = require("../../../models/Channel");

//import messages
const {somethingWentWrong, voiceCaption, answerRegistrated} = require("../../../messages/similarMessages");
const {yourQuestionAnswered} = require("../../../messages/studentMessages");
const {onlyVoiceMessage} = require("../../../messages/similarMessages");

//our variables
let questionText;
let messageDatails;

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
            const channelsData = await ChannelModel.find()
            const channelsIds = channelsData.map(channel => channel.channelChatId);
            if (channelsIds.length !== 0) {
                for (let item in channelsIds) {
                    await ctx.telegram.sendVoice(
                        channelsIds[item],
                        ctx.message.voice.file_id,
                        {caption: voiceCaption(questionText[0])}
                    );
                }
            } else return await ctx.reply("بات عضو کانالی نیست")
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
            }, 1500);
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
