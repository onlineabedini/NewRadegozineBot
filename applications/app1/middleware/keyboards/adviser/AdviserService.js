//import models
const AdminModel = require("../../../models/Admin");
const AdviserModel = require("../../../models/Adviser");
const StudentModel = require("../../../models/Student");

//import stateList
const stateList = require("../../stateList");

//import buttons
const {cancelButton} = require("../../../buttons/similarButtons/cancelButton");
const {studentStartButtons} = require("../../../buttons/studentButtons/studentStartButtons");
const {answerButtons} = require("../../../buttons/similarButtons/answerButtons");

//import messages
const {
    enterYourMessage,
    viewStudentsQuestionsList,
    studentInfoMessage,
    emptyList
} = require("../../../messages/similarMessages");
const {youHaveBeenRemoved} = require("../../../messages/similarMessages");

//define AdviserService class
// create an instance
module.exports = new class AdviserService {
    async sendMessageForAdmins(ctx, next) {
        let adviser = await AdviserModel.findOne({userChatId: ctx.message.chat.id});
        if (adviser) {
            ctx.session.state = stateList.sendMessageForAdmins;
            await ctx.reply(enterYourMessage, cancelButton);
        } else {
            ctx.reply(youHaveBeenRemoved, studentStartButtons);
        }
    }

    async getStudentsQuestionsList(ctx, next) {
        ctx.session.state = undefined;
        const studentsData = await StudentModel.find();
        const studentsIds = studentsData.map((student) => student.id);
        let adviser = await AdviserModel.findOne({
            userName: ctx.message.chat.username,
        });
        if (adviser) {
            if (studentsIds.length !== 0) {
                await ctx.reply(viewStudentsQuestionsList);
                for (const item in studentsIds) {
                    let student = await StudentModel.findOne({_id: studentsIds[item]});
                    await ctx.telegram.sendMessage(
                        ctx.message.chat.id,
                        studentInfoMessage(student),
                        answerButtons
                    );
                }
            } else {
                await ctx.reply(emptyList);
            }
        } else {
            ctx.reply(youHaveBeenRemoved, studentStartButtons);
        }
    }
}