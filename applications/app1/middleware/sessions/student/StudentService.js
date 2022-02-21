//import model
const QuestionerModel = require("../../../models/Questioner");

//import stateList
const stateList = require('../../stateList')

const {all_buttons_text} = require("../../../buttons/all_keyborad_text");

const {auth_button} = require("../../../buttons/similar_buttons/auth_button");

//import messages
const {
    enter_your_question_as_text, your_question_registrated_message
} = require("../../../messages/studentMessages");
const {text_message_only, enter_field_message , enter_grade_message} = require("../../../messages/similarMessages");

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
                ctx.reply(enter_field_message);
            } else {
                ctx.reply(text_message_only, await auth_button(ctx));
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
                ctx.reply(enter_grade_message);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, await auth_button(ctx));
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
                ctx.reply(enter_your_question_as_text);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, await auth_button(ctx));
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
                ctx.reply(your_question_registrated_message, await auth_button(ctx));
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, await auth_button(ctx));
            }
        }
    }
}