const ProStudentModel = require("../../models/ProStudent");
const PlanModel = require("../../models/Plan");
const {
    accept_discard_buttons,
} = require("../../buttons/similar_buttons/accept_discard_buttons");
const {
    cancel_button,
} = require("../../buttons/similar_buttons/cancel_button");
const {
    text_message_only,
    enter_field_message,
    enter_grade_message,
    enter_phone_number_message,
    enter_whats_up_number_message,
    enter_email_message,
    enter_city_message,
    your_information_was_successfully_registered_message,
    this_plan_no_longer_exists_message,
    something_went_wrong_please_try_again_message,
    your_registration_has_been_canceled_message,
    payment_photo_was_sent_to_admin_message,
    your_information_is_not_recorded_message,
    photo_message_only,
    information_updated_message,
    input_is_invalid_message,
    no_email,
} = require("../../messages/similar_messages");
const stateList = require("../state_list");
const {
    pro_student_caption, pro_student_registration_preview,
} = require("../../messages/admin_messages");
const {
    registered_for_plan_message,
} = require("../../messages/student_messages");
const {
    pro_student_register_buttons,
} = require("../../buttons/admin_buttons/pro_student_register_buttons");

const {
    request_contact_button,
} = require("../../buttons/similar_buttons/request_contact_button");
const {
    send_pay_pic_button,
} = require("../../buttons/user_buttons/send_pay_pic_button");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const {
    enter_field_buttons,
} = require("../../buttons/similar_buttons/enter_field_buttons");
const {
    register_buttons,
} = require("../../buttons/user_buttons/register_buttons");
const {
    enter_grade_buttons,
} = require("../../buttons/similar_buttons/enter_grade_buttons");
const {
    skip_from_this_step_buttons,
} = require("../../buttons/similar_buttons/skip_from_this_step");
const {
    student_start_buttons,
} = require("../../buttons/student_buttons/student_start_buttons");

module.exports = {
    [stateList.get_pro_student_fullname]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const proStudentFullName = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentFullName,
                };
                ctx.session.state = stateList.get_pro_student_field;
                ctx.reply(enter_field_message, enter_field_buttons);
            } else {
                if (ctx.session.status === "update") {
                    ctx.session = undefined;
                    return ctx.reply(text_message_only, student_start_buttons);
                }
                ctx.session = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [stateList.get_pro_student_field]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi || ctx.message.text === all_buttons_text.tajrobi || ctx.message.text === all_buttons_text.ensani || ctx.message.text === all_buttons_text.honar || ctx.message.text === all_buttons_text.zaban || ctx.message.text === all_buttons_text.other_fields) {
                const proStudentField = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentField,
                };
                ctx.session.state = stateList.get_pro_student_grade;
                ctx.reply(enter_grade_message, enter_grade_buttons);
            } else {
                if (ctx.session.status === "update") {
                    ctx.session = undefined;
                    return ctx.reply(input_is_invalid_message, student_start_buttons);
                }
                ctx.session = undefined;
                ctx.reply(input_is_invalid_message, register_buttons);
            }
        }
    }, [stateList.get_pro_student_grade]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth || ctx.message.text === all_buttons_text.eleventh || ctx.message.text === all_buttons_text.twelfth) {
                const proStudentGrade = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentGrade,
                };
                ctx.session.state = stateList.get_pro_student_phone_number;
                ctx.reply(enter_phone_number_message, request_contact_button);
            } else {
                if (ctx.session.status === "update") {
                    ctx.session = undefined;
                    return ctx.reply(input_is_invalid_message, student_start_buttons);
                }
                ctx.session = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [stateList.get_pro_student_phone_number]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.contact?.phone_number) {
                const proStudentPhoneNumber = ctx.message.contact.phone_number;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentPhoneNumber,
                };
                ctx.session.state = stateList.get_pro_student_whats_up_number;
                ctx.reply(enter_whats_up_number_message, request_contact_button);
            } else {
                if (ctx.session.status === "update") {
                    ctx.session = undefined;
                    return ctx.reply(input_is_invalid_message, student_start_buttons);
                }
                ctx.session = undefined;
                ctx.reply(input_is_invalid_message, register_buttons);
            }
        }
    }, [stateList.get_pro_student_whats_up_number]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text || ctx.message.contact?.phone_number) {
                const proStudentWhatsUpNumber = (await ctx.message.contact?.phone_number) ? ctx.message.contact.phone_number : ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentWhatsUpNumber,
                };
                ctx.session.state = stateList.get_pro_student_email;
                ctx.reply(enter_email_message, skip_from_this_step_buttons);
            } else {
                if (ctx.session.status === "update") {
                    ctx.session = undefined;
                    return ctx.reply(text_message_only, student_start_buttons);
                }
                ctx.session = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [stateList.get_pro_student_email]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.message.text !== all_buttons_text.skip_from_this_step) {
                    const proStudentEmail = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentEmail,
                    };
                    ctx.session.state = stateList.get_pro_student_city;
                    ctx.reply(enter_city_message, cancel_button);
                } else {
                    const proStudentEmail = no_email;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentEmail,
                    };
                    ctx.session.state = stateList.get_pro_student_city;
                    ctx.reply(enter_city_message, cancel_button);
                }
            } else {
                if (ctx.session.status === "update") {
                    ctx.session = undefined;
                    return ctx.reply(text_message_only, student_start_buttons);
                }
                ctx.session = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [stateList.get_pro_student_city]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const proStudentCity = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentCity,
                };
                ctx.session.state = stateList.register_pro_student;
                ctx.reply(await pro_student_registration_preview(ctx.session.stateData, ctx.chat.username), accept_discard_buttons);
            } else {
                if (ctx.session.status === "update") {
                    ctx.session = undefined;
                    return ctx.reply(text_message_only, student_start_buttons);
                }
                ctx.session = undefined;
                ctx.reply(text_message_only, register_buttons);
            }
        }
    }, [stateList.get_pro_student_payment_picture]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.photo) {
                const student = await ProStudentModel.findById(ctx.session.stateData.planId);
                if (student) {
                    const student = await ProStudentModel.findByIdAndUpdate(ctx.session.stateData.planId, {
                        payment_picture: ctx.message.photo[0].file_id,
                    }, {new: true});
                    await student.save();
                    await ctx.telegram.sendPhoto(process.env.MAIN_ADMIN_ID, student.payment_picture, {
                        caption: await pro_student_caption(student),
                        reply_markup: pro_student_register_buttons(student._id),
                    });
                    ctx.session = undefined;
                    ctx.reply(payment_photo_was_sent_to_admin_message, register_buttons);
                } else {
                    ctx.session = undefined;
                    ctx.reply(your_information_is_not_recorded_message, register_buttons);
                }
            } else {
                ctx.session = undefined;
                ctx.reply(photo_message_only, register_buttons);
            }
        }
    }, [stateList.register_pro_student]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.accept) {
            let student = await ProStudentModel.findOne({chat_id: ctx.chat.id});
            if (student) {
                student = await ProStudentModel.findOneAndUpdate({chat_id: ctx.chat.id}, {
                    fullname: ctx.session.stateData.proStudentFullName,
                    field: ctx.session.stateData.proStudentField,
                    grade: ctx.session.stateData.proStudentGrade,
                    phone_number: ctx.session.stateData.proStudentPhoneNumber,
                    email: ctx.session.stateData.proStudentEmail,
                    whats_up_number: ctx.session.stateData.proStudentWhatsUpNumber,
                    city: ctx.session.stateData.proStudentCity,
                    chat_id: ctx.chat.id,
                    userName: ctx.chat.username,
                }, {new: true});
                await student.save();
                return ctx.reply(information_updated_message, student_start_buttons);
            }

            const newProStudent = await new ProStudentModel({
                plan_id: ctx.session.stateData.planId,
                fullname: ctx.session.stateData.proStudentFullName,
                field: ctx.session.stateData.proStudentField,
                grade: ctx.session.stateData.proStudentGrade,
                phone_number: ctx.session.stateData.proStudentPhoneNumber,
                email: ctx.session.stateData.proStudentEmail,
                whats_up_number: ctx.session.stateData.proStudentWhatsUpNumber,
                city: ctx.session.stateData.proStudentCity,
                chat_id: ctx.chat.id,
                userName: ctx.chat.username,
            });
            await newProStudent.save();

            ctx.reply(your_information_was_successfully_registered_message, register_buttons);
            const plan = await PlanModel.findById(ctx.session.stateData.planId);
            if (plan) {

                await ctx.reply(`علیرضا عابدینی
        شماره کارت : 
        6219861903895505
        
        ❌ توجه ❌
        - به این شماره کارت هزینه طرح را واریز کنید و عکس ( کاملا واضح ) از فیش پرداخت خود در همین قسمت ارسال کنید.
        
        ❌ تذکر ❌ فیش پرداخت رو تا بعد از تایید شدن پرداخت پیش خودتون نگه دارید و دور نندازید تا درصورت درخواست ادمین مجدد تصویر ارسال کنید.
        
        - درصورت بروز هرگونه مشکل با ما تماس بگیرید: 
        09924730751
        @radegozine_manager`)

                ctx.reply(registered_for_plan_message(plan), send_pay_pic_button(newProStudent._id));
            } else {
                ctx.session = undefined;
                ctx.reply(this_plan_no_longer_exists_message, register_buttons);
            }
            ctx.session = undefined;
        } else if (ctx.message.text === all_buttons_text.discard) {
            if (ctx.session.status === "update") {
                ctx.session = undefined;
                return ctx.reply(your_registration_has_been_canceled_message, student_start_buttons);
            }
            ctx.session = undefined;
            ctx.reply(your_registration_has_been_canceled_message, register_buttons);
        } else {
            if (ctx.session.status === "update") {
                ctx.session = undefined;
                return ctx.reply(something_went_wrong_please_try_again_message, student_start_buttons);
            }
            ctx.session = undefined;
            ctx.reply(something_went_wrong_please_try_again_message, register_buttons);
        }
    },
};
