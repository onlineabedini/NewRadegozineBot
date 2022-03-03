const stateList = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const {
    enter_admin_fullname_message,
    invalid_username_entered_message,
    admin_removed_message,
    no_admin_found_message,
    admin_registrated_message,
    duplicate_admin_message
} = require("../../messages/admin_messages");
const {manage_admins_buttons} = require("../../buttons/admin_buttons/manage_admins_buttons");
const {text_message_only} = require("../../messages/similar_messages");
const AdminModel = require("../../models/Admin");
const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");

module.exports = {
    //Add admin
    [stateList.add_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = await ctx.message.text;
                const adminUserName = inputUserName.split("@")[1];
                if (adminUserName) {
                    ctx.session.stateData = {...ctx.session.stateData, adminUserName};
                    ctx.session.state = stateList.get_admin_fullname;
                    ctx.reply(enter_admin_fullname_message);
                } else {
                    ctx.reply(invalid_username_entered_message, manage_admins_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_admins_buttons);
            }
        }
    }, //Remove admin
    [stateList.remove_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adminUserName = inputUserName.split("@")[1];
                const admin = await AdminModel.findOne({username: adminUserName});
                if (admin) {
                    await AdminModel.findOneAndDelete({userName: adminUserName});
                    ctx.reply(admin_removed_message, manage_admins_buttons);
                } else {
                    ctx.reply(no_admin_found_message, manage_admins_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_admins_buttons);
            }
        }
    }, //Register admin
    //Get admin full name
    [stateList.get_admin_fullname]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel_button) {
            if (ctx.message.text) {
                const adminFullName = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adminFullName};
                const adminData = await AdminModel.findOne({
                    userName: ctx.session.stateData.adminUserName,
                });
                if (!adminData) {
                    const newAdmin = new AdminModel({
                        userName: ctx.session.stateData.adminUserName, fullname: ctx.session.stateData.adminFullName,
                    });
                    await newAdmin.save();
                    ctx.session.stateData = undefined;
                    ctx.reply(admin_registrated_message, admin_start_buttons);
                } else {
                    ctx.session.stateData = undefined;
                    ctx.reply(duplicate_admin_message, admin_start_buttons);
                }
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_admins_buttons);
            }
        }
    },
}