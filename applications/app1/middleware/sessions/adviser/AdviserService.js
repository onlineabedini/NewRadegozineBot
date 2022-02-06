const Adviser = require("../../../models/Adviser");
const Student = require("../../../models/Student");

const {cancelButtonText} = require('../../../buttons/similarButtons/cancelButton')
const {adviserStartButtons} = require("../../../buttons/adviserButtons/adviserStartButtons");
const {messageSent, somethingWentWrong, voiceCaption, answerRegistrated} = require("../../../messages/similarMessages");
const {yourQuestionAnswered} = require("../../../messages/studentMessages");
const {onlyVoiceMessage} = require("../../../messages/adviserMessages");

let QuestionText;
let MessageDatails;


const mainInfo = {
    MainAdminUsername: "siralinpr",
    ChannelChatId: -1001644994780,
};


module.exports = new class AdminService {
    async sendMessageForAdmins(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
            let adviser = await Adviser.findOne({ChatId: ctx.message.chat.id});
            adviser.Username = ctx.message.chat.username;
            adviser.MessageId.push(ctx.message.message_id);
            adviser.save();
            await ctx.reply(messageSent, adviserStartButtons);
        } else next();
    }

    async answer(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.update.callback_query?.data &&
            ctx.update.callback_query.data !== "CANCEL"
        ) {
            const tempMessage = await ctx.reply(somethingWentWrong);
            await ctx.telegram.deleteMessage(MessageDatails[0], MessageDatails[2]);
            setTimeout(() => {
                ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
            }, 3000);
        } else if (ctx.update.callback_query?.data === "CANCEL") {
            await ctx.telegram.deleteMessage(
                ctx.update.callback_query.message.chat.id,
                ctx.update.callback_query.message.message_id
            );
        } else if (ctx.message?.voice) {
            await ctx.telegram.sendVoice(
                mainInfo.ChannelChatId,
                ctx.message.voice.file_id,
                {caption: voiceCaption(QuestionText[0])}
            );
            const tempMessage = await ctx.reply(answerRegistrated);
            const student = await Student.findOne({
                MessageText: QuestionText[0].split(":")[1],
            });
            await ctx.telegram.sendMessage(
                student.ChatId,
                yourQuestionAnswered
            );
            await ctx.telegram.deleteMessage(
                ctx.message.chat.id,
                ctx.message.message_id
            );
            await ctx.telegram.deleteMessage(MessageDatails[0], MessageDatails[2]);
            await ctx.telegram.deleteMessage(MessageDatails[0], MessageDatails[1]);
            setTimeout(() => {
                ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
            }, 3000);
            await Student.findOneAndDelete({
                MessageText: QuestionText[0].split(":")[1],
            });
        } else {
            await ctx.reply(onlyVoiceMessage);
            next();
        }
    }

    sendQuestionText(StudentQuestionText) {
        QuestionText = [];
        QuestionText.push(StudentQuestionText);
    };

    sendMessageDetails = (chatId, messageId1, messageId2) => {
        MessageDatails = [];
        MessageDatails.push(chatId, messageId1, messageId2);
    }

}
