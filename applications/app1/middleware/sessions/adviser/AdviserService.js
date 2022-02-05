const Adviser = require("../../../models/Adviser");
const Student = require("../../../models/Student");

let QuestionText;
let MessageDatails;

const {
    mainButtonsText,
    AdvisersStartBtns,
} = require("../../../buttons/ButtonManager");

const mainInfo = {
    MainAdminUsername: "siralinpr",
    ChannelChatId: -1001644994780,
};

const {
    SENDMESSAGEWASSUCCESSFUL,
    ANSWERREGISTERED,
    YOURQUESTIONHASBEENANSWERED,
    VOICEMESSAGEONLY,
    voiceCaption,
    SOMETHINGWENTWORNG,
} = require("../../../messages/MessageHandler");

module.exports = new class AdminService {
    async sendMessageForAdmins(ctx , next){
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
            let adviser = await Adviser.findOne({ ChatId: ctx.message.chat.id });
            adviser.Username = ctx.message.chat.username;
            adviser.MessageId.push(ctx.message.message_id);
            adviser.save();
            await ctx.reply(SENDMESSAGEWASSUCCESSFUL, AdvisersStartBtns);
        } else next();
    }

    async answer(ctx , next){
        ctx.session.state = undefined;
        if (
            ctx.update.callback_query?.data &&
            ctx.update.callback_query.data !== "CANCEL"
        ) {
            const tempMessage = await ctx.reply(SOMETHINGWENTWORNG);
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
                { caption: voiceCaption(QuestionText[0]) }
            );
            const tempMessage = await ctx.reply(ANSWERREGISTERED);
            const student = await Student.findOne({
                MessageText: QuestionText[0].split(":")[1],
            });
            await ctx.telegram.sendMessage(
                student.ChatId,
                YOURQUESTIONHASBEENANSWERED
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
            await ctx.reply(VOICEMESSAGEONLY);
            next();
        }
    }

    sendQuestionText (StudentQuestionText) {
        QuestionText = [];
        QuestionText.push(StudentQuestionText);
    };

    sendMessageDetails = (chatId, messageId1, messageId2) => {
        MessageDatails = [];
        MessageDatails.push(chatId, messageId1, messageId2);
    }

}
