//import models
const AdviserModel = require("../../models/Adviser");

//import buttons
const {
  cancel_button,
} = require("../../buttons/similar_buttons/cancel_button");
const {
  adviser_start_buttons,
} = require("../../buttons/adviser_buttons/adviser_start_buttons");

//import messages
const {
  message_sent_successfully,
  text_message_only,
  enter_email_message,
  enter_field_message,
  enter_university_message,
  enter_description_message,
  your_information_has_been_registered_you_will_be_notified_if_confirmed_message,
  your_registration_has_been_canceled_message,
  something_went_wrong_please_try_again_message,
  input_is_invalid_message,
  no_email,
} = require("../../messages/similar_messages");
const {
  enter_city_message,
  enter_phone_number_message,
} = require("../../messages/similar_messages");
const stateList = require("../stateList");

const {
  accept_discard_buttons,
} = require("../../buttons/similar_buttons/accept_discard_buttons");
const {
  preview_adviser_registration_form,
} = require("../../messages/student_messages");

const {
  request_contact_button,
} = require("../../buttons/similar_buttons/request_contact_button");

const { all_buttons_text } = require("../../buttons/all_buttons_text");
const {
  register_buttons,
} = require("../../buttons/user_buttons/register_buttons");
const {
  skip_from_this_step_buttons,
} = require("../../buttons/similar_buttons/skip_from_this_step");

module.exports = {
  [stateList.sendMessageForAdmins]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text !== all_buttons_text.cancel) {
      let adviser = await AdviserModel.findOne({
        userChatId: ctx.message.chat.id,
      });
      adviser.userName = ctx.message.chat.username;
      adviser.messagesIds.push(ctx.message.message_id);
      adviser.save();
      ctx.reply(message_sent_successfully, adviser_start_buttons);
    }
  },
  [stateList.getAdviserFullNameForRegister]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text !== all_buttons_text.cancel) {
      if (ctx.message.text) {
        const adviserFullName = await ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, adviserFullName };
        ctx.session.state = stateList.getAdviserPhoneNumber;
        ctx.reply(enter_phone_number_message, request_contact_button);
      } else {
        ctx.session.stateData = undefined;
        ctx.reply(text_message_only, register_buttons);
      }
    }
  },
  [stateList.getAdviserPhoneNumber]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text !== all_buttons_text.cancel) {
      if (ctx.message.contact?.phone_number) {
        const adviserPhoneNumber = ctx.message.contact.phone_number;
        ctx.session.stateData = {
          ...ctx.session.stateData,
          adviserPhoneNumber,
        };
        ctx.session.state = stateList.getAdviserEmail;
        ctx.reply(enter_email_message, skip_from_this_step_buttons);
      } else {
        ctx.session.stateData = undefined;
        ctx.reply(input_is_invalid_message, register_buttons);
      }
    }
  },
  [stateList.getAdviserEmail]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text !== all_buttons_text.cancel) {
      if (ctx.message.text) {
        if (
          ctx.message.text &&
          ctx.message.text !== all_buttons_text.skip_from_this_step
        ) {
          const adviserEmail = ctx.message.text;
          ctx.session.stateData = { ...ctx.session.stateData, adviserEmail };
          ctx.session.state = stateList.getAdviserCity;
          ctx.reply(enter_city_message, cancel_button);
        } else {
          const adviserEmail = no_email;
          ctx.session.stateData = { ...ctx.session.stateData, adviserEmail };
          ctx.session.state = stateList.getAdviserCity;
          ctx.reply(enter_city_message, cancel_button);
        }
      } else {
        ctx.session.stateData = undefined;
        ctx.reply(text_message_only, register_buttons);
      }
    }
  },
  [stateList.getAdviserCity]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text !== all_buttons_text.cancel) {
      if (ctx.message.text) {
        const adviserCity = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, adviserCity };
        ctx.session.state = stateList.getAdviserField;
        ctx.reply(enter_field_message, cancel_button);
      } else {
        ctx.session.stateData = undefined;
        ctx.reply(text_message_only, register_buttons);
      }
    }
  },
  [stateList.getAdviserField]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text !== all_buttons_text.cancel) {
      if (ctx.message.text) {
        const adviserField = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, adviserField };
        ctx.session.state = stateList.getAdviserUniversity;
        ctx.reply(enter_university_message, cancel_button);
      } else {
        ctx.session.stateData = undefined;
        ctx.reply(text_message_only, register_buttons);
      }
    }
  },
  [stateList.getAdviserUniversity]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text !== all_buttons_text.cancel) {
      if (ctx.message.text) {
        const adviserUniversity = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, adviserUniversity };
        ctx.session.state = stateList.getAdviserDescription;
        ctx.reply(enter_description_message, cancel_button);
      } else {
        ctx.session.stateData = undefined;
        ctx.reply(text_message_only, register_buttons);
      }
    }
  },
  [stateList.getAdviserDescription]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text !== all_buttons_text.cancel) {
      if (ctx.message.text) {
        const adviserDescription = ctx.message.text;
        ctx.session.stateData = {
          ...ctx.session.stateData,
          adviserDescription,
        };
        ctx.session.state = stateList.saveRegisteredAdviserInfo;
        ctx.reply(
          preview_adviser_registration_form(ctx.session.stateData),
          accept_discard_buttons
        );
      } else {
        ctx.session.stateData = undefined;
        ctx.reply(text_message_only, register_buttons);
      }
    }
  },
  [stateList.saveRegisteredAdviserInfo]: async (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message.text === all_buttons_text.accept) {
      const newAdviser = await new AdviserModel({
        userChatId: ctx.chat.id,
        userName: ctx.chat.username,
        userFullName: ctx.session.stateData.adviserFullName,
        userPhoneNumber: ctx.session.stateData.adviserPhoneNumber,
        userEmail: ctx.session.stateData.adviserEmail,
        userCity: ctx.session.stateData.adviserCity,
        userField: ctx.session.stateData.adviserField,
        userUniversity: ctx.session.stateData.adviserUniversity,
        userDescription: ctx.session.stateData.adviserDescription,
        IsRegistered: true,
      });
      await newAdviser.save();
      ctx.session.stateData = undefined;
      ctx.reply(
        your_information_has_been_registered_you_will_be_notified_if_confirmed_message,
        register_buttons
      );
    } else if (ctx.message.text === all_buttons_text.discard) {
      ctx.session.stateData = undefined;
      ctx.reply(your_registration_has_been_canceled_message, register_buttons);
    } else {
      ctx.session.stateData = undefined;
      ctx.reply(
        something_went_wrong_please_try_again_message,
        register_buttons
      );
    }
  },
};
