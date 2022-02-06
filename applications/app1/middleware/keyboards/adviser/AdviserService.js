const Admin = require("../../../models/Admin");
const Adviser = require("../../../models/Adviser");
const Student = require("../../../models/Student");

const stateList = require("../../stateList");
const {cancelButton} = require("../../../buttons/similarButtons/cancelButton");
const {
    enterYourMessage,
    showStudentsQuestionsList,
    studentInfoMessage,
    emptyList
} = require("../../../messages/similarMessages");
const {studentStartButtons} = require("../../../buttons/studentButtons/studentStartButtons");
const {youHaveBeenRemoved} = require("../../../messages/adviserMessages");
const {answerButtons} = require("../../../buttons/similarButtons/answerButtons");

module.exports = new class AdviserService {
    async sendMessageForAdmins(ctx, next) {
        let adviser = await Adviser.findOne({ChatId: ctx.message.chat.id});
        if (adviser) {
            ctx.session.state = stateList.SENDMESSAGEFORADMINS;
            await ctx.reply(enterYourMessage, cancelButton);
        } else {
            ctx.reply(youHaveBeenRemoved, studentStartButtons);
        }
    }

    async getStudentsQuestionsList(ctx, next) {
        ctx.session.state = undefined;
        const StudentsData = await Student.find();
        const StudentsIds = StudentsData.map((element) => element.id);
        let adviser = await Adviser.findOne({
            Username: ctx.message.chat.username,
        });
        let admin = await Admin.findOne({Username: ctx.message.chat.username});
        if (admin || adviser) {
            if (StudentsIds.length !== 0) {
                await ctx.reply(showStudentsQuestionsList);
                for (const item in StudentsIds) {
                    let student = await Student.findOne({_id: StudentsIds[item]});
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