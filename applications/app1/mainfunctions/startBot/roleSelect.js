//import models
const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const ProStudentModel = require("../../models/ProStudent");
const UserModel = require("../../models/User");

// import Admin buttons
const {admin_start_buttons} = require('../../buttons/admin_buttons/admin_start_buttons')
const {adviser_start_buttons} = require('../../buttons/adviser_buttons/adviser_start_buttons')
const {pro_adviser_start_buttons} = require('../../buttons/adviser_buttons/pro_adviser_start_buttons')
const {student_start_buttons} = require('../../buttons/student_buttons/student_start_buttons')
const {user_start_buttons} = require('../../buttons/user_buttons/user_start_buttons')

// import Admin Messages
const {adminStartMessage} = require('../../messages/adminMessages')
const {adviserStartMessage, proAdviserStartMessage} = require('../../messages/adviserMessages')
const {studentStartMessage, userStartMessage} = require('../../messages/studentMessages')

module.exports = class roleSelect {
    async role_selector(ctx, next) {
        console.log('select role here')
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        const proAdviser = await AdviserModel.findOne({userName: ctx.chat.username, isPro: true});
        const normalAdviser = await AdviserModel.findOne({userName: ctx.chat.username, isAccepted: true, isPro: false});
        const proStudent = await ProStudentModel.findOne({userName: ctx.chat.username, isPro: true});
        // save main admin data in database at the first bot started
        if (process.env.MAIN_ADMIN_USERNAME === ctx.chat.username) {
            const mainAdmin = await AdminModel.findOne({
                userName: ctx.chat.username,
            });
            if (!mainAdmin) {
                const mainAdmin = await new AdminModel({
                    userFullName: "مدیر اصلی",
                    userName: ctx.chat.username,
                    userChatId: ctx.chat.id,
                })
                await mainAdmin.save();
                ctx.reply(adminStartMessage, admin_start_buttons);
            } else {
                const mainAdmin = await AdminModel.findOneAndUpdate({userName: ctx.chat.username}, {
                    userChatId: ctx.chat.id
                }, {new: true});
                await mainAdmin.save();
                ctx.reply(adminStartMessage, admin_start_buttons);
            }
        } else if (admin) {
            const admin = await AdminModel.findOneAndUpdate({userName: ctx.chat.username}, {
                userChatId: ctx.chat.id
            }, {new: true});
            await admin.save();
            ctx.reply(adminStartMessage, admin_start_buttons);
        } else if (proAdviser) {
            const proAdviser = await AdviserModel.findOneAndUpdate({userName: ctx.chat.username}, {
                userChatId: ctx.chat.id
            }, {new: true});
            await proAdviser.save();
            ctx.reply(proAdviserStartMessage, pro_adviser_start_buttons);
        } else if (normalAdviser) {
            const normalAdviser = await AdviserModel.findOneAndUpdate({userName: ctx.chat.username}, {
                userChatId: ctx.chat.id
            }, {new: true});
            await normalAdviser.save();
            ctx.reply(adviserStartMessage, adviser_start_buttons);
        } else if (proStudent) {
            const proStudent = await ProStudentModel.findOneAndUpdate({userName: ctx.chat.username}, {
                userChatId: ctx.chat.id
            }, {new: true});
            await proStudent.save();
            ctx.reply(studentStartMessage, student_start_buttons);
        } else {
            const user = await UserModel.findOne({userChatId: ctx.chat.id});
            if (!user) {
                const newUser = await new UserModel({
                    userChatId: ctx.chat.id,
                    userName: ctx.chat.username,
                    userFirstName: ctx.chat.first_name,
                    userLastName: ctx.chat.last_name,
                })
                await newUser.save();
                ctx.reply(userStartMessage, user_start_buttons);
            } else {
                const user = await UserModel.findOneAndUpdate({userName: ctx.chat.username}, {
                    userChatId: ctx.chat.id
                }, {new: true});
                await user.save();
                ctx.reply(userStartMessage, user_start_buttons);
            }
        }
    }
}