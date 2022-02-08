//import models
const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const UserModel = require("../../models/User");

// import Admin buttons
const {adminStartButtons} = require('../../buttons/adminButtons/adminStartButtons')
const {adviserStartButtons} = require('../../buttons/adviserButtons/adviserStartButtons')
const {studentStartButtons} = require('../../buttons/studentButtons/studentStartButtons')

// import Admin Messages
const {adminStartMessage} = require('../../messages/adminMessages')
const {adviserStartMessage} = require('../../messages/adviserMessages')
const {studentStartMessage} = require('../../messages/studentMessages')


const mainInfo = {
    mainAdminUsername: "radegozine_manager",
    ChannelChatId: -1001312069430,
}


module.exports = class roleSelect {
    async role_selector(ctx, next) {
        console.log('select role here')

        //get all admins username
        const allAdmins = await AdminModel.find();
        const adminsUserNames = allAdmins.map((admin) => admin.userName);

        //get all advisers username
        const allAdvisers = await AdviserModel.find();
        const advisersUserNames = allAdvisers.map((adviser) => adviser.userName);

        // save main admin data in database at the first bot started
        if (ctx.message.from.username === mainInfo.mainAdminUsername) {
            const mainAdmin = await AdminModel.findOne({
                userName: ctx.message.from.username,
            });
            if (!mainAdmin) {
                const newAdmin = new AdminModel({
                    userName: ctx.message.from.username,
                    userFullName: "مدیر اصلی",
                })
                await newAdmin.save();
                return await ctx.reply(adminStartMessage, adminStartButtons);
            } else {
                return await ctx.reply(adminStartMessage, adminStartButtons);
            }
        } else if (adminsUserNames.includes(ctx.message.from.username)) {
            return await ctx.reply(adminStartMessage, adminStartButtons);
        } else if (advisersUserNames.includes(ctx.message.from.username)) {
            let adviser = await AdviserModel.findOneAndUpdate({
                userName: ctx.message.from.username,
            }, {userChatId: ctx.message.from.id}, {new: true});
            await adviser.save();
            return await ctx.reply(adviserStartMessage, adviserStartButtons);
        } else {
            const user = await UserModel.findOne({userChatId: ctx.message.chat.id});
            if (!user) {
                const newUser = new UserModel({
                    userId: ctx.message.from.id,
                    userChatId: ctx.message.chat.id,
                    userName: ctx.message.from.username,
                    userFirstName: ctx.message.from.first_name,
                    userLastName: ctx.message.from.last_name,
                })
                await newUser.save();
                return await ctx.reply(studentStartMessage, studentStartButtons);
            } else return await ctx.reply(studentStartMessage, studentStartButtons);
        }
    }
}