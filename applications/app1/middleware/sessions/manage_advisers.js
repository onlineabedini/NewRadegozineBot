const AdviserModel = require("../../models/Adviser");
const UserModel = require("../../models/User");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {manage_advisers_buttons} = require("../../buttons/admin_buttons/manage_advisers_buttons");
const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {
    enter_adviser_fullname_message,
    invalid_username_entered_message,
    adviser_removed_message,
    no_adviser_found_message,
    The_adviser_was_promoted,
    no_adviser_found_with_this_username,
    The_adviser_was_demoted,
    adviser_registrated_message,
    duplicate_adviser_message,
    adviser_accepted_message,
    adviser_not_found,
    this_adviser_has_already_been_removed_message, adviser_not_accepted_message,
    your_request_to_register_as_a_adviser_has_been_denied_message
} = require("../../messages/admin_messages");
const {
    text_message_only,
    you_have_been_accepted_message,
    your_request_has_been_canceled,
    input_is_invalid_message
} = require("../../messages/similar_messages");
const {you_have_been_promoted, you_have_been_demoted} = require("../../messages/adviser_messages");

module.exports = {
    [state_list.add_adviser]: async (ctx) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const username = ctx.message.text;
                const adviser_username = username.split("@")[1];
                if (adviser_username) {
                    ctx.session.state_data = {...ctx.session.state_data, adviser_username};
                    ctx.session.state = state_list.get_adviser_fullname;
                    ctx.reply(enter_adviser_fullname_message, cancel_button);
                } else {
                    ctx.session.state = state_list.add_adviser;
                    ctx.reply(invalid_username_entered_message);
                }
            } else {
                ctx.session.state = state_list.add_adviser;
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_adviser_fullname]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviser_fullname = ctx.message.text;
                const adviser = await AdviserModel.findOne({
                    username: ctx.session.state_data.adviser_username,
                });
                if (!adviser) {
                    const new_adviser = await new AdviserModel({
                        username: ctx.session.state_data.adviser_username,
                        fullname: adviser_fullname,
                        is_accepted: true,
                    });
                    await new_adviser.save();
                    ctx.session = undefined;
                    ctx.reply(adviser_registrated_message, admin_start_buttons);
                } else {
                    ctx.session = undefined;
                    ctx.reply(duplicate_adviser_message, manage_advisers_buttons);
                }
            } else {
                ctx.session.state = state_list.get_adviser_fullname
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.remove_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const username = ctx.message.text;
                const adviser_username = username.split("@")[1];
                if (adviser_username) {
                    const adviser = await AdviserModel.findOne({
                        username: adviser_username,
                    });
                    if (adviser) {
                        await AdviserModel.findOneAndDelete({username: adviser_username});
                        ctx.reply(adviser_removed_message, manage_advisers_buttons);
                        ctx.session = undefined;
                    } else {
                        ctx.session.state = state_list.remove_adviser;
                        ctx.reply(no_adviser_found_message);
                    }
                } else {
                    ctx.session.state = state_list.remove_adviser
                    ctx.reply(invalid_username_entered_message);
                }

            } else {
                ctx.session.state = state_list.remove_adviser;
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.promote_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const username = ctx.message.text;
                const adviser_username = username.split("@")[1];
                if (adviser_username) {
                    let adviser = await AdviserModel.findOne({
                        username: adviser_username,
                    });
                    if (adviser) {
                        adviser = await AdviserModel.findOneAndUpdate({username: adviser_username}, {
                            is_pro: true,
                        }, {new: true});
                        await adviser.save();
                        adviser.chat_id ? await ctx.telegram.sendMessage(adviser.chat_id , you_have_been_promoted) : null
                        ctx.reply(The_adviser_was_promoted, manage_advisers_buttons);
                        ctx.session = undefined;
                    } else {
                        ctx.session.state = state_list.promote_adviser
                        ctx.reply(no_adviser_found_with_this_username);
                    }
                } else {
                    ctx.session.state = state_list.promote_adviser
                    ctx.reply(invalid_username_entered_message);
                }
            } else {
                ctx.session.state = state_list.promote_adviser
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.demote_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const username = ctx.message.text;
                const adviser_username = username.split("@")[1];
                if (adviser_username) {
                    let adviser = await AdviserModel.findOne({
                        username: adviser_username,
                    });
                    if (adviser) {
                        adviser = await AdviserModel.findOneAndUpdate({username: adviser_username}, {
                            is_pro: false,
                        }, {new: true});
                        await adviser.save();
                        adviser.chat_id ? await ctx.telegram.sendMessage(adviser.chat_id , you_have_been_demoted) : null
                        ctx.reply(The_adviser_was_demoted, manage_advisers_buttons);
                        ctx.session = undefined;
                    } else {
                        ctx.session.state = state_list.demote_adviser
                        ctx.reply(no_adviser_found_with_this_username);
                    }
                } else {
                    ctx.session.state = state_list.demote_adviser
                    ctx.reply(invalid_username_entered_message);
                }
            } else {
                ctx.session.state = state_list.demote_adviser
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.accept_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let adviser = await AdviserModel.findById(ctx.session.adviser_id);
            if (adviser) {
                adviser = await AdviserModel.findByIdAndUpdate(ctx.session.adviser_id, {
                    is_accepted: true,
                }, {new: true});
                await adviser.save();
                await UserModel.findOneAndDelete(adviser.chat_id);
                await ctx.reply(adviser_accepted_message, manage_advisers_buttons);
                await ctx.telegram.sendMessage(adviser.chat_id, you_have_been_accepted_message);
                ctx.session = undefined;
            } else {
                ctx.reply(adviser_not_found, manage_advisers_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, manage_advisers_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, manage_advisers_buttons);
            ctx.session = undefined;
        }
    }, [state_list.reject_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let adviser = await AdviserModel.findById(ctx.session.adviser_id);
            if (adviser) {
                await ctx.telegram.sendMessage(adviser.chat_id, your_request_to_register_as_a_adviser_has_been_denied_message)
                ctx.reply(adviser_not_accepted_message, manage_advisers_buttons);
                await AdviserModel.findByIdAndDelete(ctx.session.adviser_id);
                ctx.session = undefined;
            } else {
                ctx.session = undefined;
                ctx.reply(this_adviser_has_already_been_removed_message, manage_advisers_buttons);
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.session = undefined;
            ctx.reply(your_request_has_been_canceled, manage_advisers_buttons);
        } else {
            ctx.session = undefined;
            ctx.reply(input_is_invalid_message, manage_advisers_buttons);
        }
    },
}