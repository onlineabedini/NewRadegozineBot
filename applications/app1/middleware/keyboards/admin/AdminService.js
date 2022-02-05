const Admin = require("../../../models/Admin");
const Adviser = require("../../../models/Adviser");
const Student = require("../../../models/Student");

const stateList  = require("../../stateList");
let MessageIds;

const {
    AdminsStartBtns,
    StudentsStartBtns,
    manageAdminsBtns,
    manageAdvisersBtns,
    answerBtn,
    cancelBtn,
    addAdminCancelBtn,
    removeAdminCancelBtn,
    addAdviserCancelBtn,
    removeAdviserCancelBtn,
} = require("../../../buttons/ButtonManager");

const {
    ENTERADMINUSERNAME,
    adminInfoMessage,
    ADMINSLIST,
    ADMINNOTFOUND,
    ENTERADVISERUSERNAME,
    adviserInfoMessage,
    ADVISERSLIST,
    ADVISERNOTFOUND,
    SELECTANITEM,
    ENTERMESSAGE,
    ADVISERSAUTHENTICATION,
    STUDENTSQUESTIONSLIST,
    studentInfoMessage,
    EMPTYLIST,
    ADVISERSQUESTIONSLIST,
    REQUESTCANCELED,
} = require("../../../messages/MessageHandler");

module.exports = new class AdminService {
    async addAdmin(ctx , next){
        ctx.session.state = stateList.ADDADMIN;
        await ctx.reply(ENTERADMINUSERNAME, addAdminCancelBtn);
    }

    async removeAdmin(ctx , next){
        ctx.session.state = stateList.REMOVEADMIN;
        await ctx.reply(ENTERADMINUSERNAME, removeAdminCancelBtn);
    }

    async getAdminsList(ctx , next){
        ctx.session.state = undefined;
        const AdminsData = await Admin.find();
        const AdminsId = AdminsData.map((element) => element.id);
        if (AdminsId.length !== 0) {
            let AdminsList = "";
            for (const item in AdminsId) {
                const admin = await Admin.findOne({ _id: AdminsId[item] });
                AdminsList += adminInfoMessage(admin);
            }
            await ctx.reply(ADMINSLIST);
            await ctx.reply(AdminsList);
        } else {
            await ctx.reply(ADMINNOTFOUND);
        }
    }
    async addAdviser(ctx , next){
        ctx.session.state = stateList.ADDADVISER;
        await ctx.reply(ENTERADVISERUSERNAME, addAdviserCancelBtn);
    }

    async removeAdviser(ctx , next){
        ctx.session.state = stateList.REMOVEADVISER;
        await ctx.reply(ENTERADVISERUSERNAME, removeAdviserCancelBtn);
    }

    async getAdvisersList(ctx , next){
        ctx.session.state = undefined;
        const AdvisersData = await Adviser.find();
        const AdvisersId = AdvisersData.map((element) => element.id);
        if (AdvisersId.length !== 0) {
            let AdvisersList = "";
            for (const item in AdvisersId) {
                let adviser = await Adviser.findOne({ _id: AdvisersId[item] });
                AdvisersList += adviserInfoMessage(adviser);
            }
            await ctx.reply(ADVISERSLIST);
            await ctx.reply(AdvisersList);
        } else {
            await ctx.reply(ADVISERNOTFOUND);
        }
    }

    async manageAdmins(ctx , next){
        ctx.session.state = undefined;
        await ctx.reply(SELECTANITEM, manageAdminsBtns);
    }
    async manageAdvisers(ctx , next){
        ctx.session.state = undefined;
        await ctx.reply(SELECTANITEM, manageAdvisersBtns);
    }

    async sendMessageForAdvisers(ctx , next){
        ctx.session.state = stateList.SENDMESSAGEFORADVISERS;
        await ctx.reply(ENTERMESSAGE, cancelBtn);
    }
    async sendMessageForStudents(ctx , next){
        ctx.session.state = stateList.SENDMESSAGEFORSTUDENTS;
        await ctx.reply(ENTERMESSAGE, cancelBtn);
    }
    async getStudentsQuestionsListForAdmins(ctx , next){
        ctx.session.state = undefined;
        const StudentsData = await Student.find();
        const StudentsIds = StudentsData.map((element) => element.id);
        let adviser = await Adviser.findOne({
            Username: ctx.message.chat.username,
        });
        let admin = await Admin.findOne({ Username: ctx.message.chat.username });
        if (admin || adviser) {
            if (StudentsIds.length !== 0) {
                await ctx.reply(STUDENTSQUESTIONSLIST);
                for (const item in StudentsIds) {
                    let student = await Student.findOne({ _id: StudentsIds[item] });
                    await ctx.telegram.sendMessage(
                        ctx.message.chat.id,
                        studentInfoMessage(student),
                        answerBtn
                    );
                }
            } else {
                await ctx.reply(EMPTYLIST);
            }
        } else {
            ctx.reply(ADVISERSAUTHENTICATION, StudentsStartBtns);
        }
    }

    async getAdvisersQuestionsList(ctx, next){
        ctx.session.state = undefined;
        const AdvisersData = await Adviser.find();
        const AdvisersIds = AdvisersData.map((element) => element.id);
        if (AdvisersIds.length !== 0) {
            MessageIds = [];
            await ctx.reply(ADVISERSQUESTIONSLIST);
            for (const item in AdvisersIds) {
                let adviser = await Adviser.findOne({ _id: AdvisersIds[item] });
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
                await ctx.reply(EMPTYLIST);
            }
        } else {
            await ctx.reply(EMPTYLIST);
        }
    }

    async addAdminCancel(ctx, next){
        ctx.session.state = undefined;
        await ctx.reply(REQUESTCANCELED, manageAdminsBtns);
    }
    async removeAdminCancel(ctx, next){
        ctx.session.state = undefined;
        await ctx.reply(REQUESTCANCELED, manageAdminsBtns);
    }

    async addAdviserCancel(ctx, next){
        ctx.session.state = undefined;
        await ctx.reply(REQUESTCANCELED, manageAdvisersBtns);
    }

    async removeAdviserCancel(ctx, next){
        ctx.session.state = undefined;
        await ctx.reply(REQUESTCANCELED, manageAdvisersBtns);
    }

    back (ctx , next){
        ctx.session.state = undefined;
        ctx.reply(SELECTANITEM, AdminsStartBtns);
    }

}