//import model
const StudentModel = require("../../../models/Student");

//import stateList
const stateList = require('../../stateList')

//import buttons
const {cancelButtonText} = require("../../../buttons/similarButtons/cancelButton");
const {studentStartButtons} = require("../../../buttons/studentButtons/studentStartButtons");

//import messages
const {
    enterField,
    enterGrade,
    enterQuestion,
    questionRegistrated
} = require("../../../messages/studentMessages");
const {onlyTextMessage} = require("../../../messages/similarMessages");

//define StudentService class
// create an instance
module.exports = new class StudentService {
    async getStudentFullName(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const fullName = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, fullName};
                ctx.session.state = stateList.getStudentField;
                await ctx.reply(enterField);
            } else {
                await ctx.reply(onlyTextMessage, studentStartButtons);
            }
        }
    }

    async getStudentField(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const field = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, field};
                ctx.session.state = stateList.getStudentGrade;
                await ctx.reply(enterGrade);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(onlyTextMessage, studentStartButtons);
            }
        }
    }

    async getStudentGrade(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const grade = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, grade};
                ctx.session.state = stateList.askQuestion;
                await ctx.reply(enterQuestion);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(onlyTextMessage, studentStartButtons);
            }
        }
    }

    async askQuestion(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const newStudent = await new StudentModel({
                    userChatId: ctx.message.chat.id,
                    userName: ctx.message.chat.username,
                    userFullName: ctx.session.stateData.fullName,
                    userField: ctx.session.stateData.field,
                    userGrade: ctx.session.stateData.grade,
                    userMessageId: ctx.message.message_id,
                    userMessageText: ctx.message.text,
                });
                await newStudent.save();
                ctx.session.stateData = undefined;
                await ctx.reply(questionRegistrated, studentStartButtons);
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(onlyTextMessage, studentStartButtons);
            }
        }
    }
}