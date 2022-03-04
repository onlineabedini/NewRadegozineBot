const AdminModel = require("../../models/Admin");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {manage_admins_buttons} = require("../../buttons/admin_buttons/manage_admins_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {
    enter_admin_fullname_message,
    invalid_username_entered_message,
    admin_removed_message,
    no_admin_found_message,
    admin_registrated_message,
    duplicate_admin_message
} = require("../../messages/admin_messages");
const {text_message_only} = require("../../messages/similar_messages");

module.exports = {
    //Add admin
    [state_list.add_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const username = await ctx.message.text;
                const admin_username = username.split("@")[1];
                if (admin_username) {
                    ctx.session.state_data = {...ctx.session.state_data, admin_username};
                    ctx.session.state = state_list.get_admin_fullname;
                    ctx.reply(enter_admin_fullname_message, cancel_button);
                } else {
                    ctx.session.state = state_list.add_admin
                    ctx.reply(invalid_username_entered_message, cancel_button);
                }
            } else {
                ctx.session.state = state_list.add_admin
                ctx.reply(text_message_only, cancel_button);
            }
        }
    },//Get admin full name
    [state_list.get_admin_fullname]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel_button) {
            if (ctx.message.text) {
                const admin_fullname = ctx.message.text;
                const admin = await AdminModel.findOne({
                    username: ctx.session.state_data.admin_username,
                });
                if (!admin) {
                    const new_admin = await new AdminModel({
                        username: ctx.session.state_data.admin_username,
                        fullname: admin_fullname,
                    });
                    await new_admin.save();
                    ctx.session = undefined;
                    ctx.reply(admin_registrated_message, manage_admins_buttons);
                } else {
                    ctx.session = undefined;
                    ctx.reply(duplicate_admin_message, manage_admins_buttons);
                }
            } else {
                ctx.session.state = state_list.get_admin_fullname
                ctx.reply(text_message_only, cancel_button);
            }
        }
    }, //Remove admin
    [state_list.remove_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const username = ctx.message.text;
                const admin_username = username.split("@")[1];
                if (admin_username) {
                    const admin = await AdminModel.findOne({username: admin_username});
                    if (admin) {
                        await AdminModel.findOneAndDelete({username: admin_username});
                        ctx.session = undefined
                        ctx.reply(admin_removed_message, manage_admins_buttons);
                    } else {
                        ctx.session.state = state_list.remove_admin
                        ctx.reply(no_admin_found_message, cancel_button);
                    }
                } else {
                    ctx.session.state = state_list.remove_admin
                    ctx.reply(invalid_username_entered_message, cancel_button);
                }
            } else {
                ctx.session.state = state_list.remove_admin
                ctx.reply(text_message_only, cancel_button);
            }
        }
    },
}