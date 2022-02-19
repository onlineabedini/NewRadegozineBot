//import model
const QuestionerModel = require("../../../models/Questioner");

//import stateList
const stateList = require('../../stateList')

const {all_buttons_text} = require("../../../buttons/all_keyborad_text");

const {auth_button} = require("../../../buttons/similar_buttons/auth_button");

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
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const fullName = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, fullName};
                ctx.session.state = stateList.getStudentField;
                ctx.reply(enterField);
            } else {
                ctx.reply(onlyTextMessage, await auth_button(ctx));
            }
        }
    }

    async getStudentField(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const field = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, field};
                ctx.session.state = stateList.getStudentGrade;
                ctx.reply(enterGrade);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, await auth_button(ctx));
            }
        }
    }

    async getStudentGrade(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const grade = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, grade};
                ctx.session.state = stateList.askQuestion;
                ctx.reply(enterQuestion);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, await auth_button(ctx));
            }
        }
    }

    async askQuestion(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const newQuestion = await new QuestionerModel({
                    userChatId: ctx.message.chat.id,
                    userName: ctx.message.chat.username,
                    userFullName: ctx.session.stateData.fullName,
                    userField: ctx.session.stateData.field,
                    userGrade: ctx.session.stateData.grade,
                    userMessageId: ctx.message.message_id,
                    userMessageText: ctx.message.text,
                });
                await newQuestion.save();
                ctx.session.stateData = undefined;
                ctx.reply(questionRegistrated, await auth_button(ctx));
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, await auth_button(ctx));
            }
        }
    }
}