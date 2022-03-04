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
const state_list = require("../state_list");
const {
    pro_student_caption, pro_student_registration_preview,
} = require("../../messages/admin_messages");
const {
    registered_for_plan_message, payment_information_message,
} = require("../../messages/student_messages");
const {
    pro_student_register_buttons,
} = require("../../buttons/admin_buttons/pro_student_register_buttons");

const {
    request_contact_button,
} = require("../../buttons/similar_buttons/request_contact_button");
const {
    send_pay_pic_button,
} = require("../../buttons/user_buttons/send_payment_picture_button");
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
const {user_start_buttons} = require("../../buttons/user_buttons/user_start_buttons");

module.exports = {
    [state_list.get_pro_student_fullname]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const student_fullname = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_fullname,
                };
                ctx.session.state = state_list.get_pro_student_field;
                ctx.reply(enter_field_message, enter_field_buttons);
            } else {
                ctx.reply(text_message_only, cancel_button);
                ctx.session.state = state_list.get_pro_student_fullname;
            }
        }
    }, [state_list.get_pro_student_field]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi ||
                ctx.message.text === all_buttons_text.tajrobi ||
                ctx.message.text === all_buttons_text.ensani ||
                ctx.message.text === all_buttons_text.honar ||
                ctx.message.text === all_buttons_text.zaban ||
                ctx.message.text === all_buttons_text.other_fields) {
                const student_field = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_field,
                };
                ctx.session.state = state_list.get_pro_student_grade;
                ctx.reply(enter_grade_message, enter_grade_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_field;
                ctx.reply(input_is_invalid_message, enter_field_buttons);
            }
        }
    }, [state_list.get_pro_student_grade]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth ||
                ctx.message.text === all_buttons_text.eleventh ||
                ctx.message.text === all_buttons_text.twelfth) {
                const student_grade = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_grade,
                };
                ctx.session.state = state_list.get_pro_student_phone_number;
                ctx.reply(enter_phone_number_message, request_contact_button);
            } else {
                ctx.session.state = state_list.get_pro_student_grade;
                ctx.reply(input_is_invalid_message, enter_grade_buttons);
            }
        }
    }, [state_list.get_pro_student_phone_number]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text || ctx.message.contact?.phone_number) {
                const student_phone_number = (await ctx.message.contact?.phone_number) ? ctx.message.contact.phone_number : ctx.message.text
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_phone_number,
                };
                ctx.session.state = state_list.get_pro_student_whats_up_number;
                ctx.reply(enter_whats_up_number_message, request_contact_button);
            } else {
                ctx.session.state = state_list.get_pro_student_phone_number;
                ctx.reply(input_is_invalid_message, request_contact_button);
            }
        }
    }, [state_list.get_pro_student_whats_up_number]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text || ctx.message.contact?.phone_number) {
                const student_whats_up_number = (await ctx.message.contact?.phone_number) ? ctx.message.contact.phone_number : ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_whats_up_number,
                };
                ctx.session.state = state_list.get_pro_student_email;
                ctx.reply(enter_email_message, skip_from_this_step_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_whats_up_number;
                ctx.reply(text_message_only, request_contact_button);
            }
        }
    }, [state_list.get_pro_student_email]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.message.text !== all_buttons_text.skip_from_this_step) {
                    const student_email = await ctx.message.text;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_email,
                    };
                    ctx.session.state = state_list.get_pro_student_city;
                    ctx.reply(enter_city_message, cancel_button);
                } else {
                    const student_email = no_email;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_email,
                    };
                    ctx.session.state = state_list.get_pro_student_city;
                    ctx.reply(enter_city_message, cancel_button);
                }
            } else {
                ctx.session.state = state_list.get_pro_student_email;
                ctx.reply(text_message_only, cancel_button);
            }
        }
    }, [state_list.get_pro_student_city]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const student_city = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_city,
                };
                ctx.session.state = state_list.register_pro_student;
                ctx.reply(await pro_student_registration_preview(ctx.session.state_data, ctx.chat.username), accept_discard_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_city;
                ctx.reply(text_message_only, cancel_button);
            }
        }
    }, [state_list.register_pro_student]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.accept) {
            let student = await ProStudentModel.findOne({chat_id: ctx.chat.id});
            if (student && ctx.session.status === 'update') {
                student = await ProStudentModel.findOneAndUpdate({chat_id: ctx.chat.id}, {
                    fullname: ctx.session.state_data.student_fullname,
                    field: ctx.session.state_data.student_field,
                    grade: ctx.session.state_data.student_grade,
                    phone_number: ctx.session.state_data.student_phone_number,
                    email: ctx.session.state_data.student_email,
                    whats_up_number: ctx.session.state_data.student_whats_up_number,
                    city: ctx.session.state_data.student_city,
                    chat_id: ctx.chat.id,
                    username: ctx.chat.username,
                }, {new: true})
                await student.save();
                ctx.reply(information_updated_message, student_start_buttons);
                ctx.session = undefined;
            } else if (student) {
                ctx.reply("شما قبلا یکبار ثبت نام کرده اید امکان ثبت نام مجدد در این زمان فراهم نیست.", register_buttons);
                ctx.session = undefined;
            } else {
                const new_student = await new ProStudentModel({
                    plan_id: ctx.session.state_data.plan_id,
                    fullname: ctx.session.state_data.student_fullname,
                    field: ctx.session.state_data.student_field,
                    grade: ctx.session.state_data.student_grade,
                    phone_number: ctx.session.state_data.student_phone_number,
                    email: ctx.session.state_data.student_email,
                    whats_up_number: ctx.session.state_data.student_whats_up_number,
                    city: ctx.session.state_data.student_city,
                    chat_id: ctx.chat.id,
                    username: ctx.chat.username,
                })
                await new_student.save()
                ctx.reply(your_information_was_successfully_registered_message, register_buttons);
                const plan = await PlanModel.findById(ctx.session.state_data.plan_id);
                await ctx.reply(payment_information_message);
                ctx.reply(registered_for_plan_message(plan), send_pay_pic_button(new_student._id));
                ctx.session = undefined;
            }
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
    [state_list.get_pro_student_payment_picture]:
        async (ctx, next) => {
            ctx.session.state = undefined;
            if (ctx.message.text !== all_buttons_text.cancel) {
                if (ctx.message.photo) {
                    let student = await ProStudentModel.findById(ctx.session.state_data.student_id);
                    if (student) {
                        student = await ProStudentModel.findByIdAndUpdate(ctx.session.state_data.student_id, {
                            payment_picture: ctx.message.photo[0].file_id,
                        }, {new: true})
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
        },
}
;
