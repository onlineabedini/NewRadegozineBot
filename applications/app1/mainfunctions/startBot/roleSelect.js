//import models
const Admin = require("../../models/Admin");
const Adviser = require("../../models/Adviser");
const User = require("../../models/User");

// import Admin buttons
const {adminStartButtons} = require('../../buttons/adminButtons/adminStartButtons')
const {adviserStartButtons} = require('../../buttons/adviserButtons/adviserStartButtons')
const {studentStartButtons} = require('../../buttons/studentButtons/studentStartButtons')

// import Admin Messages
const {adminStartMessage} = require('../../messages/adminMessages')
const {adviserStartMessage} = require('../../messages/adviserMessages')
const {studentStartMessage} = require('../../messages/studentMessages')


const mainInfo = {
    MainAdminUsername: "radegozine_manager",
    ChannelChatId: -1001312069430
}


module.exports = class roleSelect {
    async role_selector(ctx, next) {
        console.log('select role here')
        const AdminData = await Admin.find();
        const AdminsUsernames = AdminData.map((element) => element.Username);
        const AdviserData = await Adviser.find();
        const AdvisersUsernames = AdviserData.map((element) => element.Username);
        if (ctx.message.from.username === mainInfo.MainAdminUsername) {
            const mainAdmin = await Admin.findOne({
                Username: ctx.message.from.username,
            });
            if (!mainAdmin) {
                AddMainAdmin();

                function AddMainAdmin() {
                    const mainAdmin = new Admin({
                        Username: ctx.message.from.username,
                        Fullname: "Main Admin",
                    });
                    mainAdmin.save();
                }

                await ctx.reply(adminStartMessage, adminStartButtons);
            } else {
                await ctx.reply(adminStartMessage, adminStartButtons);
            }
        } else if (AdminsUsernames.includes(ctx.message.from.username)) {
            await ctx.reply(adminStartMessage, adminStartButtons);
        } else if (AdvisersUsernames.includes(ctx.message.from.username)) {
            let adviser = await Adviser.findOne({
                Username: ctx.message.from.username,
            });
            adviser.ChatId = ctx.message.chat.id;
            await adviser.save();
            await ctx.reply(adviserStartMessage, adviserStartButtons);
        } else {
            const UserData = await User.findOne({ChatId: ctx.message.chat.id});
            if (!UserData) {
                AddUser();

                function AddUser() {
                    const user = new User({
                        ChatId: ctx.message.chat.id,
                    });
                    user.save();
                }

                await ctx.reply(studentStartMessage, studentStartButtons);
            } else await ctx.reply(studentStartMessage, studentStartButtons);
        }
    }
}