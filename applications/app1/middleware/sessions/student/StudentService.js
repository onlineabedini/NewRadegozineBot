const Student = require("../../../models/Student");
const stateList = require('../../stateList')

const {
    mainButtonsText,
    StudentsStartBtns,
} = require("../../../buttons/ButtonManager");

const {
    ENTERFIELD,
    ENTERGRADE,
    ENTERQUESTION,
    QUESTIONREGISTERED,
    ENTERTEXTONLY,
    TEXTMESSAGEONLY,
} = require("../../../messages/MessageHandler");


module.exports = new class StudentService {
    async getStudentFullName(ctx , next){
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
            if (ctx.message.text) {
                const Fullname = ctx.message.text;
                ctx.session.stateData = { ...ctx.session.stateData, Fullname };
                ctx.session.state = stateList.GETSTUDENTFIELD;
                await ctx.reply(ENTERFIELD);
            } else {
                await ctx.reply(ENTERTEXTONLY, StudentsStartBtns);
            }
        } else next();
    }

    async getStudentField(ctx , next){
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
            if (ctx.message.text) {
                const Field = ctx.message.text;
                ctx.session.stateData = { ...ctx.session.stateData, Field };
                ctx.session.state = stateList.GETSTUDENTGRADE;
                await ctx.reply(ENTERGRADE);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(ENTERTEXTONLY, StudentsStartBtns);
            }
        } else next();
    }

    async getStudentGrade(ctx , next){
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
            if (ctx.message.text) {
                const Grade = ctx.message.text;
                ctx.session.stateData = { ...ctx.session.stateData, Grade };
                ctx.session.state = stateList.ASKQUESTION;
                await ctx.reply(ENTERQUESTION);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(ENTERTEXTONLY, StudentsStartBtns);
            }
        } else next();
    }

    async askQuestion(ctx , next){
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
            if (ctx.message.text) {
                const Fullname = ctx.session.stateData.Fullname;
                const Field = ctx.session.stateData.Field;
                const Grade = ctx.session.stateData.Grade;
                const chatId = ctx.message.chat.id;
                const username = ctx.message.chat.username;
                const messageId = ctx.message.message_id;
                const messageText = ctx.message.text;
                AddNewStudent();
                function AddNewStudent() {
                    const student = new Student({
                        ChatId: chatId,
                        Username: username,
                        Fullname: Fullname,
                        Field: Field,
                        Grade: Grade,
                        MessageId: messageId,
                        MessageText: messageText,
                    });
                    student.save();
                }
                ctx.session.stateData = undefined;
                await ctx.reply(QUESTIONREGISTERED, StudentsStartBtns);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(TEXTMESSAGEONLY, StudentsStartBtns);
            }
        } else next();
    }
}