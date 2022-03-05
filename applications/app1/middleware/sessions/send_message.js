const AdviserModel = require("../../models/Adviser.js");
const UserModel = require("../../models/User");
const ChannelModel = require("../../models/Channel");

const state_list = require("../state_list.js");

const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");
const {send_message_buttons} = require("../../buttons/admin_buttons/send_message_buttons");

const {all_buttons_text} = require("../../buttons/all_buttons_text.js");
const {message_sent_successfully} = require("../../messages/similar_messages");
const {adviser_start_buttons} = require("../../buttons/adviser_buttons/adviser_start_buttons");

const {
    your_message_has_been_sent_to_advisers_message,
    no_adviser_found_message,
    no_user_found
} = require("../../messages/admin_messages");
const {
    select_an_item_message,
    no_channel_found_message
} = require("../../messages/similar_messages");

module.exports = {
    [state_list.send_message_for_admins]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            let adviser = await AdviserModel.findOne({
                chat_id: ctx.message.chat.id,
            });
            adviser.username = ctx.message.chat.username;
            adviser.messages_ids.push(ctx.message.message_id);
            await adviser.save();
            ctx.reply(message_sent_successfully, adviser_start_buttons);
        }
    }, [state_list.send_message_for_advisers]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const advisers = await AdviserModel.find();
            if (advisers.length !== 0) {
                await advisers.forEach((adviser) => {
                    ctx.telegram.forwardMessage(adviser.chat_id, ctx.chat.id, ctx.message.message_id);
                });
                ctx.reply(your_message_has_been_sent_to_advisers_message, send_message_buttons);
            } else {
                ctx.reply(no_adviser_found_message, send_message_buttons);
            }
        }
    }, [state_list.send_message_for_all_users]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const users = await UserModel.find();
            if (users.length !== 0) {
                await users.forEach((user) => {
                    ctx.telegram.forwardMessage(user.chat_id, ctx.chat.id, ctx.message.message_id);
                });
                ctx.reply(message_sent_successfully, send_message_buttons);
            } else {
                ctx.reply(no_user_found, send_message_buttons);
            }
        }
    }, [state_list.send_message_for_channels]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const channels = await ChannelModel.find();
            if (channels.length !== 0) {
                await channels.forEach((channel) => {
                    ctx.telegram.copyMessage(channel.chat_id, ctx.chat.id, ctx.message.message_id);
                });
                ctx.reply(message_sent_successfully, send_message_buttons);
                ctx.session = undefined;
            } else {
                ctx.reply(no_channel_found_message, send_message_buttons);
                ctx.session = undefined;
            }
        }
    }, [state_list.send_message_for_reg_students]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            await ctx.telegram.forwardMessage(ctx.session.state_data.chat_id, ctx.chat.id, ctx.message.message_id);
            ctx.session = undefined;
            ctx.reply(message_sent_successfully, admin_start_buttons);
        } else {
            ctx.session = undefined;
            ctx.reply(select_an_item_message, admin_start_buttons);
        }
    },
}