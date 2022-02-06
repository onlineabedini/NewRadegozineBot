const Admin = require("../../../models/Admin");
const Adviser = require("../../../models/Adviser");
const Users = require("../../../models/User");
const stateList = require('../../stateList')

const {manageAdminsButtonsText, manageAdminsButtons,} = require('../../../buttons/adminButtons/manageAdminsButtons')
const {manageAdvisersButtonsText, manageAdvisersButtons} = require('../../../buttons/adminButtons/manageAdvisersButtons')
const {adminStartButtons} = require('../../../buttons/adminButtons/adminStartButtons')
const {cancelButtonText} = require('../../../buttons/similarButtons/cancelButton')

const {
    enterAdminFullname,
    enterAdviserFullname,
    enteredUsernameIsInvalid,
    adminRemoved,
    adviserRemoved,
    noAdminExist,
    noAdviserExist,
    duplicateAdmin,
    adminRegistrated,
    adviserRegistrated,
    duplicateAdviser,
    messageSentToAdvisers,
    noAdviserAdded,
    messageSentToStudents,
    noStudentExist,
} = require('../../../messages/adminMessages')
const {enterYourMessageAsText} = require('../../../messages/similarMessages')


module.exports = new class AdminService {
    async addAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== manageAdminsButtonsText.addAdminCancel) {
            if (ctx.message.text) {
                const InputText = ctx.message.text;
                const AdminUsername = InputText.split("@")[1];
                if (AdminUsername) {
                    ctx.session.stateData = {...ctx.session.stateData, AdminUsername};
                    ctx.session.state = stateList.GETADMINFULLNAME;
                    await ctx.reply(enterAdminFullname);
                } else {
                    ctx.reply(enteredUsernameIsInvalid, manageAdminsButtons);
                }
            } else {
                await ctx.reply(enterYourMessageAsText, manageAdminsButtons);
            }
        } else next();
    }

    async removeAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.message &&
            ctx.message.text !== manageAdminsButtonsText.removeAdminCancel
        ) {
            if (ctx.message.text) {
                const InputText = ctx.message.text;
                const AdminUsername = InputText.split("@")[1];
                const admin = await Admin.findOne({Username: AdminUsername});
                if (admin) {
                    await Admin.findOneAndDelete({Username: AdminUsername});
                    await ctx.reply(adminRemoved, manageAdminsButtons);
                } else {
                    await ctx.reply(noAdminExist, manageAdminsButtons);
                }
            } else {
                await ctx.reply(enterYourMessageAsText, manageAdminsButtons);
            }
        } else next();
    }

    async getAdminFullName(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const AdminFullname = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, AdminFullname};
                const AdminData = await Admin.findOne({
                    Username: ctx.session.stateData.AdminUsername,
                });
                if (!AdminData) {
                    AddNewAdmin();
                    await ctx.reply(adminRegistrated, adminStartButtons);
                } else {
                    await ctx.reply(duplicateAdmin, adminStartButtons);
                }

                function AddNewAdmin() {
                    const admin = new Admin({
                        Username: ctx.session.stateData.AdminUsername,
                        Fullname: ctx.session.stateData.AdminFullname,
                    });
                    admin.save();
                }

                ctx.session.stateData = undefined;
            } else {
                await ctx.reply(enterYourMessageAsText, manageAdminsButtons);
            }
        } else next();
    }

    async addAdviser(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.message &&
            ctx.message.text !== manageAdvisersButtonsText.addAdviserCancel
        ) {
            if (ctx.message.text) {
                const InputText = ctx.message.text;
                const AdviserUsername = InputText.split("@")[1];
                if (AdviserUsername) {
                    ctx.session.stateData = {...ctx.session.stateData, AdviserUsername};
                    ctx.session.state = stateList.GETADVISERFULLNAME;
                    await ctx.reply(enterAdviserFullname);
                } else {
                    ctx.reply(enteredUsernameIsInvalid, manageAdvisersButtons);
                }
            } else {
                await ctx.reply(enterYourMessageAsText, manageAdvisersButtons);
            }
        } else next();
    }

    async removeAdviser(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.message &&
            ctx.message.text !== manageAdvisersButtonsText.removeAdviserCancel
        ) {
            if (ctx.message.text) {
                const InputText = ctx.message.text;
                const AdviserUsername = InputText.split("@")[1];
                const adviser = await Adviser.findOne({Username: AdviserUsername});
                if (adviser) {
                    await Adviser.findOneAndDelete({Username: AdviserUsername});
                    await ctx.reply(adviserRemoved, manageAdvisersButtons);
                } else {
                    await ctx.reply(noAdviserExist, manageAdvisersButtons);
                }
            } else {
                await ctx.reply(enterYourMessageAsText, manageAdvisersButtons);
            }
        } else next();
    }

    async getAdviserFullName(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const AdviserFullname = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, AdviserFullname};
                const AdviserData = await Adviser.findOne({
                    Username: ctx.session.stateData.AdviserUsername,
                });

                if (!AdviserData) {
                    AddNewAdviser();
                    await ctx.reply(adviserRegistrated, adminStartButtons);
                } else {
                    await ctx.reply(duplicateAdviser, adminStartButtons);
                }

                function AddNewAdviser() {
                    const adviser = new Adviser({
                        Username: ctx.session.stateData.AdviserUsername,
                        Fullname: ctx.session.stateData.AdviserFullname,
                    });
                    adviser.save();
                }

                ctx.session.stateData = undefined;
            } else {
                await ctx.reply(enterYourMessageAsText, manageAdvisersButtons);
            }
        } else next();
    }

    async sendMessageForAdvisers(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
            const AdvisersData = await Adviser.find();
            const AdvisersId = AdvisersData.map((element) => element.id);
            if (AdvisersId.length !== 0) {
                for (let item in AdvisersId) {
                    let adviser = await Adviser.findOne({_id: AdvisersId[item]});
                    const ChatId = adviser.ChatId;
                    if (ChatId) {
                        const MessageId = ctx.message.message_id;
                        await ctx.telegram.forwardMessage(
                            ChatId,
                            ctx.message.chat.id,
                            MessageId
                        );
                    } else {
                        console.log(
                            `the username (${adviser.Username}) has not started the bot or does not exist`
                        );
                    }
                }
                await ctx.reply(messageSentToAdvisers, adminStartButtons);
            } else {
                await ctx.reply(noAdviserAdded, adminStartButtons);
            }
        } else next();
    }

    async sendMessageForStudents(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message && ctx.message.text !== cancelButtonText.cancel) {
            const UserData = await Users.find();
            const UsersChatIds = UserData.map((element) => element.ChatId);
            if (UsersChatIds.length !== 0) {
                const MessageId = ctx.message.message_id;
                for (let item in UsersChatIds) {
                    await ctx.telegram.forwardMessage(
                        UsersChatIds[item],
                        ctx.message.chat.id,
                        MessageId
                    );
                }
                ctx.reply(messageSentToStudents, adminStartButtons);
            } else {
                await ctx.reply(noStudentExist, adminStartButtons);
            }
        } else next();
    }

}
