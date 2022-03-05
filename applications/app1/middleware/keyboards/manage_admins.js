const AdminModel = require("../../models/Admin");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const state_list = require("../state_list");

const {manage_admins_buttons} = require("../../buttons/admin_buttons/manage_admins_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {select_an_item_message} = require("../../messages/similar_messages");
const {
    admins_list_title_message,
    admins_list_message,
    no_admin_found_message,
    enter_new_admin_username_message,
    enter_admin_username_for_remove_message
} = require("../../messages/admin_messages");

module.exports = {
    [all_buttons_text.manage_admins]: async (ctx) => {
        ctx.session.state = undefined;
        ctx.reply(select_an_item_message, manage_admins_buttons);
    },
    [all_buttons_text.show_admins_list]: async (ctx) => {
        ctx.session.state = undefined;
        const admins = await AdminModel.find();
        if (admins.length !== 0) {
            ctx.reply(admins_list_message(admins));
        } else {
            ctx.reply(no_admin_found_message, manage_admins_buttons);
        }
    },
    [all_buttons_text.add_admin]: async (ctx) => {
        ctx.session.state = state_list.add_admin;
        await ctx.reply(enter_new_admin_username_message, cancel_button);
    },
    [all_buttons_text.remove_admin]: async (ctx) => {
        ctx.session.state = state_list.remove_admin;
        await ctx.reply(enter_admin_username_for_remove_message, cancel_button);
    },
}