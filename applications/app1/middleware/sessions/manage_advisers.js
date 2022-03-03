const stateList = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
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
    this_adviser_has_already_been_removed_message
} = require("../../messages/admin_messages");
const {manage_advisers_buttons} = require("../../buttons/admin_buttons/manage_advisers_buttons");
const {
    text_message_only, you_have_been_accepted_message, your_request_has_been_canceled, input_is_invalid_message
} = require("../../messages/similar_messages");
const AdviserModel = require("../../models/Adviser");
const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");

module.exports = {
    [stateList.add_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adviserUserName = inputUserName.split("@")[1];
                if (adviserUserName) {
                    ctx.session.stateData = {...ctx.session.stateData, adviserUserName};
                    ctx.session.state = stateList.get_adviser_fullname;
                    ctx.reply(enter_adviser_fullname_message);
                } else {
                    ctx.reply(invalid_username_entered_message, manage_advisers_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_advisers_buttons);
            }
        }
    }, [stateList.remove_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputText = ctx.message.text;
                const adviserUserName = inputText.split("@")[1];
                const adviser = await AdviserModel.findOne({
                    username: adviserUserName,
                });
                if (adviser) {
                    await AdviserModel.findOneAndDelete({username: adviserUserName});
                    ctx.reply(adviser_removed_message, manage_advisers_buttons);
                } else {
                    ctx.reply(no_adviser_found_message, manage_advisers_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_advisers_buttons);
            }
        }
    }, [stateList.promote_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adviserUserName = inputUserName.split("@")[1];
                if (adviserUserName) {
                    const adviser = await AdviserModel.findOne({
                        userName: adviserUserName,
                    });
                    if (adviser) {
                        const adviser = await AdviserModel.findOneAndUpdate({userName: adviserUserName}, {
                            is_pro: true,
                        }, {new: true});
                        await adviser.save();
                        ctx.reply(The_adviser_was_promoted, manage_advisers_buttons);
                    } else {
                        ctx.reply(no_adviser_found_with_this_username, manage_advisers_buttons);
                    }
                } else {
                    ctx.reply(invalid_username_entered_message, manage_advisers_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_advisers_buttons);
            }
        }
    }, [stateList.demote_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adviserUserName = inputUserName.split("@")[1];
                if (adviserUserName) {
                    const adviser = await AdviserModel.findOne({
                        userName: adviserUserName,
                    });
                    if (adviser) {
                        const adviser = await AdviserModel.findOneAndUpdate({userName: adviserUserName}, {
                            is_pro: false,
                        }, {new: true});
                        await adviser.save();
                        ctx.reply(The_adviser_was_demoted, manage_advisers_buttons);
                    } else {
                        ctx.reply(no_adviser_found_with_this_username, manage_advisers_buttons);
                    }
                } else {
                    ctx.reply(invalid_username_entered_message, manage_advisers_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_advisers_buttons);
            }
        }
    }, [stateList.get_adviser_fullname]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserFullName = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserFullName};
                const adviserData = await AdviserModel.findOne({
                    userName: ctx.session.stateData.adviserFullName,
                });
                if (!adviserData) {
                    const newAdviser = new AdviserModel({
                        userName: ctx.session.stateData.adviserUserName,
                        fullname: ctx.session.stateData.adviserFullName,
                        is_accepted: true,
                    });
                    await newAdviser.save();
                    ctx.session.stateData = undefined;
                    ctx.reply(adviser_registrated_message, admin_start_buttons);
                } else {
                    ctx.session.stateData = undefined;
                    ctx.reply(duplicate_adviser_message, admin_start_buttons);
                }
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_advisers_buttons);
            }
        }
    }, [stateList.accept_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let regAdviser = await AdviserModel.findById(ctx.session.regAdviserId);
            if (regAdviser) {
                regAdviser = await AdviserModel.findByIdAndUpdate(ctx.session.regAdviserId, {
                    is_accepted: true,
                }, {new: true});
                await regAdviser.save();
                await ctx.telegram.sendMessage(regAdviser.chat_id, you_have_been_accepted_message);
                ctx.reply(adviser_accepted_message, admin_start_buttons);
                ctx.session = undefined;
            } else {
                ctx.reply(adviser_not_found, admin_start_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, admin_start_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, admin_start_buttons);
            ctx.session = undefined;
        }
    }, [stateList.reject_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let regAdviser = await AdviserModel.findById(ctx.session.regAdviserId);
            if (regAdviser) {
                await AdviserModel.findByIdAndDelete(ctx.session.regAdviserId);
                ctx.reply("مشاور با موفقیت حذف گردید", admin_start_buttons);
                ctx.session = undefined;
            } else {
                ctx.reply(this_adviser_has_already_been_removed_message, admin_start_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, admin_start_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, admin_start_buttons);
            ctx.session = undefined;
        }
    },
}