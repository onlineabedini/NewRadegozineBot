//import models
const Admin = require("../../../models/Admin");
const Adviser = require("../../../models/Adviser");
const Student = require("../../../models/Student");
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
    enterNewAdminUsername, enterRemoveAdminUsername, adminInfoMessage, showAdminsList, noAdminExist,
    enterNewAdviserUsername, enterRemoveAdviserUsername, adviserInfoMessage, showAdvisersList, noAdviserExist,
    showAdvisersQuestionsList
} = require("../../../messages/adminMessages");


const {
    selectAnItem,
    enterYourMessage,
    showStudentsQuestionsList,
    studentInfoMessage,
    emptyList,
    requestCanceled
} = require("../../../messages/similarMessages");

const {youHaveBeenRemoved} = require("../../../messages/adviserMessages");
let MessageIds;

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
        const AdminsData = await Admin.find();
        const AdminsId = AdminsData.map((element) => element.id);
        if (AdminsId.length !== 0) {
            let AdminsList = "";
            for (const item in AdminsId) {
                const admin = await Admin.findOne({_id: AdminsId[item]});
                AdminsList += adminInfoMessage(admin);
            }
            await ctx.reply(showAdminsList);
            await ctx.reply(AdminsList);
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
        const AdvisersData = await Adviser.find();
        const AdvisersId = AdvisersData.map((element) => element.id);
        if (AdvisersId.length !== 0) {
            let AdvisersList = "";
            for (const item in AdvisersId) {
                let adviser = await Adviser.findOne({_id: AdvisersId[item]});
                AdvisersList += adviserInfoMessage(adviser);
            }
            await ctx.reply(showAdvisersList);
            await ctx.reply(AdvisersList);
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

    async getAdvisersQuestionsList(ctx, next) {
        ctx.session.state = undefined;
        const AdvisersData = await Adviser.find();
        const AdvisersIds = AdvisersData.map((element) => element.id);
        if (AdvisersIds.length !== 0) {
            MessageIds = [];
            await ctx.reply(showAdvisersQuestionsList);
            for (const item in AdvisersIds) {
                let adviser = await Adviser.findOne({_id: AdvisersIds[item]});
                let MessageId = adviser.MessageId;
                if (MessageId.length !== 0) {
                    MessageIds.push(MessageId);
                    for (const item in MessageId) {
                        await ctx.telegram.forwardMessage(
                            ctx.message.chat.id,
                            adviser.ChatId,
                            MessageId[item]
                        );
                    }
                }
            }
            if (MessageIds.length === 0) {
                await ctx.reply(emptyList);
            }
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