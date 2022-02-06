const Student = require("../../../models/Student");
const stateList = require('../../stateList')

const {cancelButtonText} = require("../../../buttons/similarButtons/cancelButton");
const {
    enterField,
    onlyTextMessage,
    enterGrade,
    enterQuestion,
    questionRegistrated
} = require("../../../messages/studentMessages");
const {studentStartButtons} = require("../../../buttons/studentButtons/studentStartButtons");

module.exports = new class StudentService {
    async getStudentFullName(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const Fullname = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, Fullname};
                ctx.session.state = stateList.GETSTUDENTFIELD;
                await ctx.reply(enterField);
            } else {
                await ctx.reply(onlyTextMessage, studentStartButtons);
            }
        } else next();
    }

    async getStudentField(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const Field = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, Field};
                ctx.session.state = stateList.GETSTUDENTGRADE;
                await ctx.reply(enterGrade);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(onlyTextMessage, studentStartButtons);
            }
        } else next();
    }

    async getStudentGrade(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const Grade = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, Grade};
                ctx.session.state = stateList.ASKQUESTION;
                await ctx.reply(enterQuestion);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(onlyTextMessage, studentStartButtons);
            }
        } else next();
    }

    async askQuestion(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
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
                await ctx.reply(questionRegistrated, studentStartButtons);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(onlyTextMessage, studentStartButtons);
            }
        } else next();
    }
}