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
                const adviserFullName = await ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserFullName};
                ctx.session.state = state_list.get_adviser_phone_number;
                ctx.reply(enter_phone_number_message, request_contact_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [state_list.get_adviser_phone_number]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.contact?.phone_number) {
                const adviserPhoneNumber = ctx.message.contact.phone_number;
                ctx.session.stateData = {
                    ...ctx.session.stateData, adviserPhoneNumber,
                };
                ctx.session.state = state_list.get_adviser_email;
                ctx.reply(enter_email_message, skip_from_this_step_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(input_is_invalid_message, register_buttons);
            }
        }
    }, [state_list.get_adviser_email]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                    const adviserEmail = ctx.message.text;
                    ctx.session.stateData = {...ctx.session.stateData, adviserEmail};
                    ctx.session.state = state_list.get_adviser_city;
                    ctx.reply(enter_city_message, cancel_button);
                } else {
                    const adviserEmail = no_email;
                    ctx.session.stateData = {...ctx.session.stateData, adviserEmail};
                    ctx.session.state = state_list.get_adviser_city;
                    ctx.reply(enter_city_message, cancel_button);
                }
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [state_list.get_adviser_city]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserCity = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserCity};
                ctx.session.state = state_list.get_adviser_field;
                ctx.reply(enter_field_message, cancel_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [state_list.get_adviser_field]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserField = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserField};
                ctx.session.state = state_list.get_adviser_university;
                ctx.reply(enter_university_message, cancel_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [state_list.get_adviser_university]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserUniversity = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserUniversity};
                ctx.session.state = state_list.get_adviser_description;
                ctx.reply(enter_description_message, cancel_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [state_list.get_adviser_description]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserDescription = ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, adviserDescription,
                };
                ctx.session.state = state_list.save_registered_adviser_info;
                ctx.reply(preview_adviser_registration_form(ctx.session.stateData), accept_discard_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [state_list.save_registered_adviser_info]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.accept) {
            const newAdviser = await new AdviserModel({
                chat_id: ctx.chat.id,
                userName: ctx.chat.username,
                fullname: ctx.session.stateData.adviserFullName,
                phone_number: ctx.session.stateData.adviserPhoneNumber,
                email: ctx.session.stateData.adviserEmail,
                city: ctx.session.stateData.adviserCity,
                field: ctx.session.stateData.adviserField,
                university: ctx.session.stateData.adviserUniversity,
                description: ctx.session.stateData.adviserDescription,
                is_registered: true,
            });
            await newAdviser.save();
            ctx.session.stateData = undefined;
            ctx.reply(your_information_has_been_registered_you_will_be_notified_if_confirmed_message, register_buttons);
        } else if (ctx.message.text === all_buttons_text.discard) {
            ctx.session.stateData = undefined;
            ctx.reply(your_registration_has_been_canceled_message, register_buttons);
        } else {
            ctx.session.stateData = undefined;
            ctx.reply(something_went_wrong_please_try_again_message, register_buttons);
        }
    },
}