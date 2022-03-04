//import models
const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const ProStudentModel = require("../../models/ProStudent");
const UserModel = require("../../models/User");

// import Admin buttons
const {
    admin_start_buttons,
} = require("../../buttons/admin_buttons/admin_start_buttons");
const {
    adviser_start_buttons,
} = require("../../buttons/adviser_buttons/adviser_start_buttons");
const {
    pro_adviser_start_buttons,
} = require("../../buttons/adviser_buttons/pro_adviser_start_buttons");
const {
    student_start_buttons,
} = require("../../buttons/student_buttons/student_start_buttons");
const {
    user_start_buttons,
} = require("../../buttons/user_buttons/user_start_buttons");

// import Admin Messages
const {admin_start_message} = require("../../messages/admin_messages");
const {
    adviser_start_message,
    pro_adviser_start_message,
} = require("../../messages/adviser_messages");
const {
    student_start_message,
    user_start_message,
} = require("../../messages/student_messages");

module.exports = class role_select {
    async role_selector(ctx, next) {
        const admin = await AdminModel.findOne({username: ctx.chat.username});
        const proAdviser = await AdviserModel.findOne({
            username: ctx.chat.username,
            is_pro: true,
        });
        const normalAdviser = await AdviserModel.findOne({
            username: ctx.chat.username,
            is_accepted: true,
            is_pro: false,
        });
        const proStudent = await ProStudentModel.findOne({
            username: ctx.chat.username,
            is_pro: true,
        });
        // save main admin data in database at the first bot started
        if (process.env.MAIN_ADMIN_USERNAME === ctx.chat.username) {
            const mainAdmin = await AdminModel.findOne({
                username: ctx.chat.username,
            });
            if (!mainAdmin) {
                const mainAdmin = await new AdminModel({
                    fullname: "مدیر اصلی",
                    username: ctx.chat.username,
                    chat_id: ctx.chat.id,
                });
                await mainAdmin.save();
                ctx.reply(admin_start_message, admin_start_buttons);
            } else {
                const mainAdmin = await AdminModel.findOneAndUpdate(
                    {username: ctx.chat.username},
                    {
                        chat_id: ctx.chat.id,
                    },
                    {new: true}
                );
                await mainAdmin.save();
                ctx.reply(admin_start_message, admin_start_buttons);
            }
        } else if (admin) {
            const admin = await AdminModel.findOneAndUpdate(
                {username: ctx.chat.username},
                {
                    chat_id: ctx.chat.id,
                },
                {new: true}
            );
            await admin.save();
            ctx.reply(admin_start_message, admin_start_buttons);
        } else if (proAdviser) {
            const proAdviser = await AdviserModel.findOneAndUpdate(
                {username: ctx.chat.username},
                {
                    chat_id: ctx.chat.id,
                },
                {new: true}
            );
            await proAdviser.save();
            ctx.reply(pro_adviser_start_message, pro_adviser_start_buttons);
        } else if (normalAdviser) {
            const normalAdviser = await AdviserModel.findOneAndUpdate(
                {username: ctx.chat.username},
                {
                    chat_id: ctx.chat.id,
                },
                {new: true}
            );
            await normalAdviser.save();
            ctx.reply(adviser_start_message, adviser_start_buttons);
        } else if (proStudent) {
            const proStudent = await ProStudentModel.findOneAndUpdate(
                {username: ctx.chat.username},
                {
                    chat_id: ctx.chat.id,
                },
                {new: true}
            );
            await proStudent.save();
            ctx.reply(student_start_message, student_start_buttons);
        } else {
            const user = await UserModel.findOne({chat_id: ctx.chat.id});
            if (!user) {
                const newUser = await new UserModel({
                    chat_id: ctx.chat.id,
                    username: ctx.chat.username,
                    first_name: ctx.chat.first_name,
                    last_name: ctx.chat.last_name,
                });
                await newUser.save();
                ctx.reply(user_start_message, user_start_buttons);
            } else {
                const user = await UserModel.findOneAndUpdate(
                    {username: ctx.chat.username},
                    {
                        chat_id: ctx.chat.id,
                    },
                    {new: true}
                );
                await user.save();
                ctx.reply(user_start_message, user_start_buttons);
            }
        }
    }
};
