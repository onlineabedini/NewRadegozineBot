const AdviserModel = require("../../models/Adviser");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {manage_advisers_buttons} = require("../../buttons/admin_buttons/manage_advisers_buttons");
const {select_an_item_message} = require("../../messages/similar_messages");
const {reg_adviser_register_buttons} = require("../../buttons/admin_buttons/reg_adviser_register_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {
    advisers_list_title_message,
    advisers_list_message,
    no_adviser_found_message,
    reg_advisers_list_title_message,
    reg_adviser_info_message,
    no_one_has_registered_recently,
    enter_new_adviser_username_message,
    enter_adviser_username_for_remove_message,
    promote_adviser_message,
    demote_adviser_message
} = require("../../messages/admin_messages");

module.exports = {
    [all_buttons_text.manage_advisers]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, manage_advisers_buttons);
    },
    [all_buttons_text.show_advisers_list]: async (ctx) => {
        ctx.session.state = undefined;
        const advisers = await AdviserModel.find({is_accepted: true});
        if (advisers.length !== 0) {
            ctx.reply(advisers_list_message(advisers));
        } else {
            ctx.reply(no_adviser_found_message, manage_advisers_buttons);
        }
    },
    [all_buttons_text.show_reg_advisers_list]: async (ctx) => {
        ctx.session.state = undefined;
        const reg_advisers = await AdviserModel.find({is_registered: true, is_accepted: false});
        await ctx.reply(reg_advisers_list_title_message);
        if (reg_advisers.length !== 0) {
            reg_advisers.forEach((reg_adviser) => {
                ctx.reply(reg_adviser_info_message(reg_adviser), reg_adviser_register_buttons(reg_adviser._id));
            });
        } else {
            ctx.reply(no_one_has_registered_recently, manage_advisers_buttons);
        }
    },
    [all_buttons_text.add_adviser]: async (ctx) => {
        ctx.session.state = state_list.add_adviser;
        await ctx.reply(enter_new_adviser_username_message, cancel_button);
    },
    [all_buttons_text.remove_adviser]: async (ctx) => {
        ctx.session.state = state_list.remove_adviser;
        await ctx.reply(enter_adviser_username_for_remove_message, cancel_button);
    },
    [all_buttons_text.promote_adviser]: async (ctx) => {
        ctx.session.state = state_list.promote_adviser;
        await ctx.reply(promote_adviser_message, cancel_button);
    },
    [all_buttons_text.demote_adviser]: async (ctx) => {
        ctx.session.state = state_list.demote_adviser;
        await ctx.reply(demote_adviser_message, cancel_button);
    },
}