//import models
const AdviserModel = require("../../../models/Adviser");

//import buttons
const {
    cancel_button,
} = require("../../../buttons/similar_buttons/cancel_button");
const {
    adviser_start_buttons,
} = require("../../../buttons/adviser_buttons/adviser_start_buttons");


//import messages
const {
    messageSent,
    onlyTextMessage,
} = require("../../../messages/similarMessages");
const stateList = require("../../stateList");

const {
    accept_discard_buttons,
} = require("../../../buttons/similar_buttons/accept_discard_buttons");
const {
    previewAdviserRegistrationForm,
} = require("../../../messages/studentMessages");

const {
    request_contact_button,
} = require("../../../buttons/similar_buttons/request_contact_button");

const {all_buttons_text} = require("../../../buttons/all_keyborad_text");
const {register_buttons} = require("../../../buttons/user_buttons/register_buttons");
const {skip_from_this_step_buttons} = require("../../../buttons/similar_buttons/skip_from_this_step");

//define AdviserService class
// create an instance
module.exports = new (class AdviserService {
    async sendMessageForAdmins(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            let adviser = await AdviserModel.findOne({
                userChatId: ctx.message.chat.id,
            });
            adviser.userName = ctx.message.chat.username;
            adviser.messagesIds.push(ctx.message.message_id);
            adviser.save();
            ctx.reply(messageSent, adviser_start_buttons);
        }
    }

    async getAdviserFullNameForRegister(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserFullName = await ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserFullName};
                ctx.session.state = stateList.getAdviserPhoneNumber;
                ctx.reply(
                    "لطفا شماره تلفن  خود را وارد کنید",
                    request_contact_button
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, register_buttons);
            }
        }
    }

    async getAdviserPhoneNumber(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.contact?.phone_number) {
                const adviserPhoneNumber = await ctx.message.contact.phone_number;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    adviserPhoneNumber,
                };
                ctx.session.state = stateList.getAdviserEmail;
                ctx.reply("لطفا ایمیل خود را وارد کنید (اختیاری)", skip_from_this_step_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply("ورودی نامعتبر است.", register_buttons);
            }
        }
    }

    async getAdviserEmail(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                    const adviserEmail = ctx.message.text;
                    ctx.session.stateData = {...ctx.session.stateData, adviserEmail};
                    ctx.session.state = stateList.getAdviserCity;
                    ctx.reply("لطفا شهر محل سکونت خود را وارد : ", cancel_button);
                } else {
                    const adviserEmail = "فاقد ایمیل";
                    ctx.session.stateData = {...ctx.session.stateData, adviserEmail};
                    ctx.session.state = stateList.getAdviserCity;
                    ctx.reply("لطفا شهر محل سکونت خود را وارد :", cancel_button);
                }
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, register_buttons);
            }
        }
    }

    async getAdviserCity(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserCity = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserCity};
                ctx.session.state = stateList.getAdviserField;
                ctx.reply("لطفا زمینه کاری خود را وارد کنید :", cancel_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, register_buttons);
            }
        }
    }

    async getAdviserField(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserField = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserField};
                ctx.session.state = stateList.getAdviserUniversity;
                ctx.reply(
                    "لطفا نام دانشگاهی که در آن تحصیل می کنید را وارد نمایید :",
                    cancel_button
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, register_buttons);
            }
        }
    }

    async getAdviserUniversity(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const adviserUniversity = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adviserUniversity};
                ctx.session.state = stateList.getAdviserDescription;
                ctx.reply(
                    "لطفا توضحیاتی (مثل سابقه ی کار) و یا سایر موارد را در مورد خود وارد کنید : ",
                    cancel_button
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, register_buttons);
            }
        }
    }

    async getAdviserDescription(ctx, next) {
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
                    previewAdviserRegistrationForm(ctx.session.stateData),
                    accept_discard_buttons
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, register_buttons);
            }
        }
    }

    async saveRegisteredAdviserInfo(ctx, next) {
        ctx.session.state = undefined;
        if (
            ctx.message.text === all_buttons_text.accept
        ) {
            const newAdviser = await new AdviserModel({
                userChatId: await ctx.chat.id,
                userName: await ctx.chat.username,
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
                "اطلاعات شما با موفقیت ثبت شد و در صورت تایید به شما اطلاع داده خواهد شد",
                register_buttons
            );
        } else if (
            ctx.message.text === all_buttons_text.discard
        ) {
            ctx.session.stateData = undefined;
            ctx.reply("ثبت نام شما با موفقیت لغو شد .", register_buttons);
        } else {
            ctx.session.stateData = undefined;
            ctx.reply(
                "خطایی پیش آمده لطفا مجددا امتحان نمایید.",
                register_buttons
            );
        }
    }
})();
