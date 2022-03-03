const AdviserModel = require("../../models/Adviser");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {manage_messages_buttons} = require("../../buttons/admin_buttons/manage_messages_buttons");
const {messages_list_buttons} = require("../../buttons/admin_buttons/messages_list_buttons");
const {send_message_buttons} = require("../../buttons/admin_buttons/send_message_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {user_start_buttons} = require("../../buttons/user_buttons/user_start_buttons");

const {
    select_an_item_message, enter_your_message, you_have_been_removed_message
} = require("../../messages/similar_messages");

module.exports = {
    [all_buttons_text.manage_messages]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, manage_messages_buttons);
    },
    [all_buttons_text.messages_list]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, messages_list_buttons);
    },
    [all_buttons_text.send_message]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, send_message_buttons);
    },
    [all_buttons_text.send_message_for_channels]: async (ctx) => {
        ctx.session.state = state_list.send_message_for_channels;
        await ctx.reply(enter_your_message, cancel_button);
    },
    [all_buttons_text.send_message_for_advisers]: async (ctx) => {
        ctx.session.state = state_list.send_message_for_advisers;
        await ctx.reply(enter_your_message, cancel_button);
    },
    [all_buttons_text.send_message_for_users]: async (ctx) => {
        ctx.session.state = state_list.send_message_for_all_users;
        await ctx.reply(enter_your_message, cancel_button);
    },
    [all_buttons_text.send_message_for_admins]: async (ctx) => {
        let adviser = await AdviserModel.findOne({
            chat_id: ctx.message.chat.id,
        });
        if (adviser) {
            ctx.session.state = state_list.send_message_for_admins;
            await ctx.reply(enter_your_message, cancel_button);
        } else {
            ctx.reply(you_have_been_removed_message, user_start_buttons);
        }
    },
}