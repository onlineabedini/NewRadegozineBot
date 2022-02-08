//import models
const AdminModel = require("../../../models/Admin");
const AdviserModel = require("../../../models/Adviser");
const StudentModel = require("../../../models/Student");

//import stateList
const stateList = require("../../stateList");

//import buttons
const {
    addAdminCancelButton,
    removeAdminCancelButton,
    manageAdminsButtons
} = require("../../../buttons/adminButtons/manageAdminsButtons");

const {
    addAdviserCancelButton,
    removeAdviserCancelButton,
    manageAdvisersButtons
} = require("../../../buttons/adminButtons/manageAdvisersButtons");

const {cancelButton} = require("../../../buttons/similarButtons/cancelButton");
const {answerButtons} = require("../../../buttons/similarButtons/answerButtons");
const {studentStartButtons} = require("../../../buttons/studentButtons/studentStartButtons");

//import messages
const {
    enterNewAdminUsername, enterRemoveAdminUsername, adminsListMessage, showAdminsList, noAdminExist,
    enterNewAdviserUsername, enterRemoveAdviserUsername, advisersListMessage, showAdvisersList, noAdviserExist,
    showAdvisersQuestionsList
} = require("../../../messages/adminMessages");


const {
    selectAnItem,
    enterYourMessage,
    viewStudentsQuestionsList,
    studentInfoMessage,
    emptyList,
    requestCanceled
} = require("../../../messages/similarMessages");

const {youHaveBeenRemoved} = require("../../../messages/similarMessages");

//define AdminService class
// create an instance
module.exports = new class AdminService {
    async addAdmin(ctx, next) {
        ctx.session.state = stateList.addAdmin;
        await ctx.reply(enterNewAdminUsername, addAdminCancelButton);
    }

    async removeAdmin(ctx, next) {
        ctx.session.state = stateList.removeAdmin;
        await ctx.reply(enterRemoveAdminUsername, removeAdminCancelButton);
    }

    async getAdminsList(ctx, next) {
        ctx.session.state = undefined;

        const adminsData = await AdminModel.find();
        const adminsIds = adminsData.map((admin) => admin.id);

        if (adminsIds.length !== 0) {
            let adminsList = "";
            for (const item in adminsIds) {
                let admin = await AdminModel.findOne({_id: adminsIds[item]});
                adminsList += adminsListMessage(admin);
            }
            await ctx.reply(showAdminsList);
            await ctx.reply(adminsList);
        } else {
            await ctx.reply(noAdminExist);
        }
    }

    async addAdviser(ctx, next) {
        ctx.session.state = stateList.addAdviser;
        await ctx.reply(enterNewAdviserUsername, addAdviserCancelButton);
    }

    async removeAdviser(ctx, next) {
        ctx.session.state = stateList.removeAdviser;
        await ctx.reply(enterRemoveAdviserUsername, removeAdviserCancelButton);
    }

    async getAdvisersList(ctx, next) {
        ctx.session.state = undefined;
        const advisersData = await AdviserModel.find();
        const advisersIds = advisersData.map((adviser) => adviser.id);
        if (advisersIds.length !== 0) {
            let advisersList = "";
            for (const item in advisersIds) {
                let adviser = await AdviserModel.findOne({_id: advisersIds[item]});
                advisersList += advisersListMessage(adviser);
            }
            await ctx.reply(showAdvisersList);
            await ctx.reply(advisersList);
        } else {
            await ctx.reply(noAdviserExist);
        }
    }

    async manageAdmins(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(selectAnItem, manageAdminsButtons);
    }

    async manageAdvisers(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(selectAnItem, manageAdvisersButtons);
    }

    async sendMessageForAdvisers(ctx, next) {
        ctx.session.state = stateList.sendMessageForAdvisers;
        await ctx.reply(enterYourMessage, cancelButton);
    }

    async sendMessageForStudents(ctx, next) {
        ctx.session.state = stateList.sendMessageForStudents;
        await ctx.reply(enterYourMessage, cancelButton);
    }

    async getStudentsQuestionsListForAdmins(ctx, next) {
        ctx.session.state = undefined;
        const studentsData = await StudentModel.find();
        const studentsIds = studentsData.map((student) => student.id);
        const admin = await AdminModel.findOne({userName: ctx.message.chat.username});
        if (admin) {
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

    async getAdvisersQuestionsList(ctx, next) {
        ctx.session.state = undefined;

        const advisersData = await AdviserModel.find();
        const advisersIds = advisersData.map((adviser) => adviser.id);

        if (advisersIds.length !== 0) {
            await ctx.reply(showAdvisersQuestionsList);
            for (const item in advisersIds) {
                let adviser = await AdviserModel.findOne({_id: advisersIds[item]});
                let messagesIds = adviser.messagesIds;
                if (messagesIds.length !== 0) {
                    for (const item in messagesIds) {
                        await ctx.telegram.forwardMessage(
                            ctx.message.chat.id,
                            adviser.userChatId,
                            messagesIds[item]
                        );
                    }
                    return;
                }
            }
            await ctx.reply(emptyList);
        } else {
            await ctx.reply(emptyList);
        }
    }

    async addAdminCancel(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(requestCanceled, manageAdminsButtons);
    }

    async removeAdminCancel(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(requestCanceled, manageAdminsButtons);
    }

    async addAdviserCancel(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(requestCanceled, manageAdvisersButtons);
    }

    async removeAdviserCancel(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(requestCanceled, manageAdvisersButtons);
    }
}