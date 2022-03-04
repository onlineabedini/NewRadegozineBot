const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const {
    enter_phone_number_message,
    text_message_only,
    enter_email_message,
    input_is_invalid_message,
    enter_city_message,
    no_email,
    enter_field_message,
    enter_university_message,
    enter_description_message,
    your_information_has_been_registered_you_will_be_notified_if_confirmed_message,
    your_registration_has_been_canceled_message,
    something_went_wrong_please_try_again_message
} = require("../../messages/similar_messages");
const {request_contact_button} = require("../../buttons/similar_buttons/request_contact_button");
const {register_buttons} = require("../../buttons/user_buttons/register_buttons");
const {skip_from_this_step_buttons} = require("../../buttons/similar_buttons/skip_from_this_step");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {preview_adviser_registration_form} = require("../../messages/student_messages");
const {accept_discard_buttons} = require("../../buttons/similar_buttons/accept_discard_buttons");
const AdviserModel = require("../../models/Adviser");

module.exports = {
    [state_list.get_adviser_fullname_for_register]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviser_fullname = await ctx.message.text;
                ctx.session.state_data = {...ctx.session.state_data, adviser_fullname};
                ctx.session.state = state_list.get_adviser_phone_number;
                ctx.reply(enter_phone_number_message, request_contact_button);
            } else {
                ctx.session.state = state_list.get_adviser_fullname_for_register;
                ctx.reply(text_message_only, cancel_button);
            }
        }
    }, [state_list.get_adviser_phone_number]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text || ctx.message.contact?.phone_number) {
                const adviser_phone_number = (await ctx.message.contact?.phone_number) ? ctx.message.contact.phone_number : ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, adviser_phone_number,
                };
                ctx.session.state = state_list.get_adviser_email;
                ctx.reply(enter_email_message, skip_from_this_step_buttons);
            } else {
                ctx.session.state = state_list.get_adviser_phone_number;
                ctx.reply(input_is_invalid_message, request_contact_button);
            }
        }
    }, [state_list.get_adviser_email]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                    const adviser_email = ctx.message.text;
                    ctx.session.state_data = {...ctx.session.state_data, adviser_email};
                    ctx.session.state = state_list.get_adviser_city;
                    ctx.reply(enter_city_message, cancel_button);
                } else {
                    const adviser_email = no_email;
                    ctx.session.state_data = {...ctx.session.state_data, adviser_email};
                    ctx.session.state = state_list.get_adviser_city;
                    ctx.reply(enter_city_message, cancel_button);
                }
            } else {
                ctx.session.state = state_list.get_adviser_email;
                ctx.reply(text_message_only, skip_from_this_step_buttons);
            }
        }
    }, [state_list.get_adviser_city]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviser_city = ctx.message.text;
                ctx.session.state_data = {...ctx.session.state_data, adviser_city};
                ctx.session.state = state_list.get_adviser_field;
                ctx.reply(enter_field_message, cancel_button);
            } else {
                ctx.session.state = state_list.get_adviser_city;
                ctx.reply(text_message_only, cancel_button);
            }
        }
    }, [state_list.get_adviser_field]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviser_field = ctx.message.text;
                ctx.session.state_data = {...ctx.session.state_data, adviser_field};
                ctx.session.state = state_list.get_adviser_university;
                ctx.reply(enter_university_message, cancel_button);
            } else {
                ctx.session.state = state_list.get_adviser_field;
                ctx.reply(text_message_only, cancel_button);
            }
        }
    }, [state_list.get_adviser_university]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviser_university = ctx.message.text;
                ctx.session.state_data = {...ctx.session.state_data, adviser_university};
                ctx.session.state = state_list.get_adviser_description;
                ctx.reply(enter_description_message, cancel_button);
            } else {
                ctx.session.state = state_list.get_adviser_university;
                ctx.reply(text_message_only, cancel_button);
            }
        }
    }, [state_list.get_adviser_description]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviser_description = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, adviser_description,
                };
                ctx.session.state = state_list.register_new_adviser;
                ctx.reply(preview_adviser_registration_form(ctx.session.state_data), accept_discard_buttons);
            } else {
                ctx.session.state = state_list.get_adviser_description;
                ctx.reply(text_message_only, cancel_button);
            }
        }
    }, [state_list.register_new_adviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.accept) {
            const new_adviser = await new AdviserModel({
                chat_id: ctx.chat.id,
                username: ctx.chat.username,
                fullname: ctx.session.state_data.adviser_fullname,
                phone_number: ctx.session.state_data.adviser_phone_number,
                email: ctx.session.state_data.adviser_email,
                city: ctx.session.state_data.adviser_city,
                field: ctx.session.state_data.adviser_field,
                university: ctx.session.state_data.adviser_university,
                description: ctx.session.state_data.adviser_description,
                is_registered: true,
            });
            await new_adviser.save();
            ctx.session = undefined;
            ctx.reply(your_information_has_been_registered_you_will_be_notified_if_confirmed_message, register_buttons);
        } else if (ctx.message.text === all_buttons_text.discard) {
            ctx.session = undefined;
            ctx.reply(your_registration_has_been_canceled_message, register_buttons);
        } else {
            ctx.session = undefined;
            ctx.reply(something_went_wrong_please_try_again_message, register_buttons);
        }
    },
}