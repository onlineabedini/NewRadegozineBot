const Student = require("../../../models/Student");
const stateList = require('../../stateList')
const { sendQuestionText,sendMessageDetails} = require("../../sessions/adviser/AdviserService");
const { confidenceBtn, cancelAdviserAnswerBtn } = require("../../../buttons/ButtonManager");
const {
    ENTERANSWER,
    DELETEMESSAGEWASSUCCESSFUL,
    DELETEMESSAGEREQUESTCANCELED,
    DELETEMESSAGECONFIDENCE,
    THISMESSAGEHASBEENDELETED,
    DELETETIP,
} = require("../../../messages/MessageHandler");

let MessageId;
let ChatId;
let StudentQuestion;

module.exports = new class AdminService {
     async answer (ctx , next){
        const tempMessage = await ctx.reply(ENTERANSWER, cancelAdviserAnswerBtn);
        sendQuestionText(ctx.update.callback_query.message.text.split("❓")[1]);
        sendMessageDetails(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id,
            tempMessage.message_id
        );
        ctx.session.state = stateList.ANSWER;
    }
    async delete (ctx , next){
        MessageId = ctx.update.callback_query.message.message_id;
        ChatId = ctx.update.callback_query.message.chat.id;
        StudentQuestion = ctx.update.callback_query.message.text;
        ctx.reply(DELETEMESSAGECONFIDENCE, confidenceBtn);
    }
    async yes (ctx , next){
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
                const tempMessage = await ctx.reply(DELETEMESSAGEWASSUCCESSFUL);
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
                const tempMessage = await ctx.reply(THISMESSAGEHASBEENDELETED);
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
            const tempMessage = await ctx.reply(DELETETIP);
            setTimeout(() => {
                ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
            }, 3000);
        }
    }
    async no (ctx , next){
        await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
        );
        const tempMessage = await ctx.reply(DELETEMESSAGEREQUESTCANCELED);
        setTimeout(() => {
            ctx.telegram.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
        }, 3000);
    }
    async cancel (ctx , next){
        await ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id,
            ctx.update.callback_query.message.message_id
        );
    }
}