//import models
const AdminModel = require("../../../models/Admin");
const AdviserModel = require("../../../models/Adviser");
const UserModel = require("../../../models/User");

//import stateList
const stateList = require('../../stateList')

//import buttons
const {manageAdminsButtonsText, manageAdminsButtons,} = require('../../../buttons/adminButtons/manageAdminsButtons')
const {
    manageAdvisersButtonsText,
    manageAdvisersButtons
} = require('../../../buttons/adminButtons/manageAdvisersButtons')
const {adminStartButtons} = require('../../../buttons/adminButtons/adminStartButtons')
const {cancelButtonText} = require('../../../buttons/similarButtons/cancelButton')

//import messages
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
const {enterYourMessageAsText, onlyTextMessage} = require('../../../messages/similarMessages')

//define AdminService class
// create an instance
module.exports = new class AdminService {
    async addAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== manageAdminsButtonsText.addAdminCancel) {
            if (ctx.message.text) {
                const inputText = ctx.message.text;
                const adminUserName = inputText.split("@")[1];
                if (adminUserName) {
                    ctx.session.stateData = {...ctx.session.stateData, adminUserName};
                    ctx.session.state = stateList.getAdminFullName;
                    await ctx.reply(enterAdminFullname);
                } else {
                    ctx.reply(enteredUsernameIsInvalid, manageAdminsButtons);
                }
            } else {
                await ctx.reply(onlyTextMessage, manageAdminsButtons);
            }
        }
    }

    async removeAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.message.text !== manageAdminsButtonsText.removeAdminCancel
        ) {
            if (ctx.message.text) {
                const inputText = ctx.message.text;
                const adminUserName = inputText.split("@")[1];
                const admin = await AdminModel.findOne({userName: adminUserName});
                if (admin) {
                    await AdminModel.findOneAndDelete({userName: adminUserName});
                    await ctx.reply(adminRemoved, manageAdminsButtons);
                } else {
                    await ctx.reply(noAdminExist, manageAdminsButtons);
                }
            } else {
                await ctx.reply(onlyTextMessage, manageAdminsButtons);
            }
        }
    }

    async getAdminFullName(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const adminFullName = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adminFullName};
                const adminData = await AdminModel.findOne({
                    userName: ctx.session.stateData.adminUserName,
                });
                if (!adminData) {
                    const newAdmin = new AdminModel({
                        userName: ctx.session.stateData.adminUserName,
                        userFullName: ctx.session.stateData.adminFullName,
                    });
                    await newAdmin.save();
                    ctx.session.stateData = undefined;
                    await ctx.reply(adminRegistrated, adminStartButtons);
                } else {
                    ctx.session.stateData = undefined;
                    await ctx.reply(duplicateAdmin, adminStartButtons);
                }
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(enterYourMessageAsText, manageAdminsButtons);
            }
        }
    }

    async addAdviser(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.message.text !== manageAdvisersButtonsText.addAdviserCancel
        ) {
            if (ctx.message.text) {
                const inputText = ctx.message.text;
                const adviserUserName = inputText.split("@")[1];
                if (adviserUserName) {
                    ctx.session.stateData = {...ctx.session.stateData, adviserUserName};
                    ctx.session.state = stateList.getAdviserFullName;
                    await ctx.reply(enterAdviserFullname);
                } else {
                    ctx.reply(enteredUsernameIsInvalid, manageAdvisersButtons);
                }
            } else {
                await ctx.reply(onlyTextMessage, manageAdvisersButtons);
            }
        }
    }

    async removeAdviser(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.message.text !== manageAdvisersButtonsText.removeAdviserCancel
        ) {
            if (ctx.message.text) {
                const inputText = ctx.message.text;
                const adviserUserName = inputText.split("@")[1];
                const adviser = await AdviserModel.findOne({userName: adviserUserName});
                if (adviser) {
                    await AdviserModel.findOneAndDelete({userName: adviserUserName});
                    await ctx.reply(adviserRemoved, manageAdvisersButtons);
                } else {
                    await ctx.reply(noAdviserExist, manageAdvisersButtons);
                }
            } else {
                await ctx.reply(onlyTextMessage, manageAdvisersButtons);
            }
        } else next();
    }

    async getAdviserFullName(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            if (ctx.message.text) {
                const adviserFullName = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserFullName};
                const adviserData = await AdviserModel.findOne({
                    userName: ctx.session.stateData.adviserFullName,
                });
                if (!adviserData) {
                    const newAdviser = new AdviserModel({
                        userName: ctx.session.stateData.adviserUserName,
                        userFullName: ctx.session.stateData.adviserFullName,
                    });
                    await newAdviser.save();
                    ctx.session.stateData = undefined;
                    await ctx.reply(adviserRegistrated, adminStartButtons);
                } else {
                    ctx.session.stateData = undefined;
                    await ctx.reply(duplicateAdviser, adminStartButtons);
                }
            } else {
                ctx.session.stateData = undefined;
                await ctx.reply(enterYourMessageAsText, manageAdvisersButtons);
            }
        }
    }

    async sendMessageForAdvisers(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            const advisersData = await AdviserModel.find();
            const advisersId = advisersData.map((adviser) => adviser.id);
            if (advisersId.length !== 0) {
                for (const item in advisersId) {
                    let adviser = await AdviserModel.findOne({_id: advisersId[item]});
                    const chatId = adviser.userChatId;
                    if (chatId) {
                        const messageId = ctx.message.message_id;
                        await ctx.telegram.forwardMessage(
                            chatId,
                            ctx.message.chat.id,
                            messageId
                        );
                    } else {
                        console.log(
                            `the username (${adviser.userName}) has not started the bot or does not exist`
                        );
                    }
                }
                await ctx.reply(messageSentToAdvisers, adminStartButtons);
            } else {
                await ctx.reply(noAdviserAdded, adminStartButtons);
            }
        }
    }

    async sendMessageForStudents(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            const usersData = await UserModel.find();
            const usersIds = usersData.map((user) => user.userChatId);
            if (usersIds.length !== 0) {
                const messageId = ctx.message.message_id;
                for (let item in usersIds) {
                    await ctx.telegram.forwardMessage(
                        usersIds[item],
                        ctx.message.chat.id,
                        messageId
                    );
                }
                ctx.reply(messageSentToStudents, adminStartButtons);
            } else {
                await ctx.reply(noStudentExist, adminStartButtons);
            }
        }
    }
}
