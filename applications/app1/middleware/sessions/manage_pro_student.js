const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const ProStudentModel = require("../../models/ProStudent");
const {
    the_student_became_a_pro_student_message,
    this_student_has_already_been_removed_message,
    the_student_was_not_accepted_message,
    the_student_was_removed_message,
    enter_pro_student_user_name_message,
    enter_pro_student_field_message,
    invalid_username_entered_message,
    enter_pro_student_grade_message,
    enter_pro_student_level_message,
    enter_pro_student_phone_number_message,
    enter_pro_student_whats_up_number_message,
    enter_pro_student_email_message,
    enter_pro_student_city_message,
    pro_student_registration_preview,
    student_registered_message,
    student_registration_canceled_message
} = require("../../messages/admin_messages");
const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");
const {
    you_have_been_accepted_message,
    your_request_has_been_canceled,
    input_is_invalid_message,
    registration_has_not_been_completed_message,
    text_message_only,
    no_contact_number,
    no_email,
    no_city,
    information_updated_message,
    error_updating_information_message,
    information_update_canceled_message
} = require("../../messages/similar_messages");
const {manage_pro_students_buttons} = require("../../buttons/admin_buttons/manage_pro_students_buttons");
const {dont_change} = require("../../buttons/similar_buttons/dont_change");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {enter_field_buttons} = require("../../buttons/similar_buttons/enter_field_buttons");
const {enter_grade_buttons} = require("../../buttons/similar_buttons/enter_grade_buttons");
const {enter_level_buttons} = require("../../buttons/similar_buttons/enter_level_buttons");
const {skip_from_this_step_buttons} = require("../../buttons/similar_buttons/skip_from_this_step");
const {accept_discard_buttons} = require("../../buttons/similar_buttons/accept_discard_buttons");

module.exports = {
    [state_list.get_pro_student_fullname_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.session.status === "update") {
                    if (ctx.message.text !== all_buttons_text.dont_change) {
                        const proStudentFullName = await ctx.message.text;
                        ctx.session.stateData = {
                            ...ctx.session.stateData, proStudentFullName,
                        };
                        ctx.session.state = state_list.get_pro_student_username_from_admin;
                        ctx.reply(enter_pro_student_user_name_message, dont_change);
                    } else {
                        const proStudentFullName = ctx.session.student.fullname;
                        ctx.session.stateData = {
                            ...ctx.session.stateData, proStudentFullName,
                        };
                        ctx.session.state = state_list.get_pro_student_username_from_admin;
                        ctx.reply(enter_pro_student_user_name_message, dont_change);
                    }
                } else {
                    const proStudentFullName = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentFullName,
                    };
                    ctx.session.state = state_list.get_pro_student_username_from_admin;
                    ctx.reply(enter_pro_student_user_name_message, cancel_button);
                }
            } else {
                ctx.session = undefined;
                ctx.reply(text_message_only, manage_pro_students_buttons);
            }
        } else {
            ctx.session = undefined;
        }
    }, [state_list.get_pro_student_username_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.session.status === "update") {
                    if (ctx.message.text !== all_buttons_text.dont_change) {
                        const proStudentUserName = await ctx.message.text.split("@")[1];
                        if (proStudentUserName) {
                            ctx.session.stateData = {
                                ...ctx.session.stateData, proStudentUserName,
                            };
                            ctx.session.state = state_list.get_pro_student_field_from_admin;
                            ctx.reply(enter_pro_student_field_message, enter_field_buttons);
                        } else {
                            ctx.reply(invalid_username_entered_message, manage_pro_students_buttons);
                            ctx.session = undefined;
                        }
                    } else {
                        const proStudentUserName = ctx.session.student.userName;
                        ctx.session.stateData = {
                            ...ctx.session.stateData, proStudentUserName,
                        };
                        ctx.session.state = state_list.get_pro_student_field_from_admin;
                        ctx.reply(enter_pro_student_field_message, enter_field_buttons);
                    }
                } else {
                    const proStudentUserName = await ctx.message.text.split("@")[1];
                    console.log(proStudentUserName);
                    if (proStudentUserName) {
                        ctx.session.stateData = {
                            ...ctx.session.stateData, proStudentUserName,
                        };
                        ctx.session.state = state_list.get_pro_student_field_from_admin;
                        ctx.reply(enter_pro_student_field_message, enter_field_buttons);
                    } else {
                        ctx.reply(invalid_username_entered_message, manage_pro_students_buttons);
                    }
                }
            } else {
                ctx.session = undefined;
                ctx.reply(text_message_only, manage_pro_students_buttons);
            }
        } else {
            ctx.session = undefined;
        }
    }, [state_list.get_pro_student_field_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi || ctx.message.text === all_buttons_text.tajrobi || ctx.message.text === all_buttons_text.ensani || ctx.message.text === all_buttons_text.honar || ctx.message.text === all_buttons_text.zaban || ctx.message.text === all_buttons_text.other_fields) {
                const proStudentField = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentField,
                };
                ctx.session.state = state_list.get_pro_student_grade_from_admin;
                ctx.reply(enter_pro_student_grade_message, enter_grade_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(invalid_username_entered_message, manage_pro_students_buttons);
            }
        }
    }, [state_list.get_pro_student_grade_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth || ctx.message.text === all_buttons_text.eleventh || ctx.message.text === all_buttons_text.twelfth) {
                const proStudentGrade = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentGrade,
                };
                ctx.session.state = state_list.get_pro_student_level_from_admin;
                ctx.reply(enter_pro_student_level_message, enter_level_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(invalid_username_entered_message, manage_pro_students_buttons);
            }
        }
    }, [state_list.get_pro_student_level_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.low || ctx.message.text === all_buttons_text.medium || ctx.message.text === all_buttons_text.high || ctx.message.text === all_buttons_text.genius) {
                const proStudentLevel = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentLevel,
                };
                ctx.session.state = state_list.get_pro_student_phone_number_from_admin;
                if (ctx.session.status === "update") return ctx.reply(enter_pro_student_phone_number_message, dont_change);
                ctx.reply(enter_pro_student_phone_number_message, skip_from_this_step_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_pro_students_buttons);
            }
        }
    }, [state_list.get_pro_student_phone_number_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentPhoneNumber = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentPhoneNumber,
                    };
                    ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin;
                    ctx.reply(enter_pro_student_whats_up_number_message, dont_change);
                } else {
                    const proStudentPhoneNumber = ctx.session.student.phone_number;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentPhoneNumber,
                    };
                    ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin;
                    ctx.reply(enter_pro_student_whats_up_number_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentPhoneNumber = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentPhoneNumber,
                };
                ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin;
                ctx.reply(enter_pro_student_whats_up_number_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentPhoneNumber = no_contact_number;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentPhoneNumber,
                };
                ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin;
                ctx.reply(enter_pro_student_whats_up_number_message, skip_from_this_step_buttons);
            } else {
                ctx.reply(text_message_only, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
        }
    }, [state_list.get_pro_student_whats_up_number_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentWhatsUpNumber = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentWhatsUpNumber,
                    };
                    ctx.session.state = state_list.get_pro_student_email_from_admin;
                    ctx.reply(enter_pro_student_email_message, dont_change);
                } else {
                    const proStudentWhatsUpNumber = ctx.session.student.whats_up_number;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentWhatsUpNumber,
                    };
                    ctx.session.state = state_list.get_pro_student_email_from_admin;
                    ctx.reply(enter_pro_student_email_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentWhatsUpNumber = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentWhatsUpNumber,
                };
                ctx.session.state = state_list.get_pro_student_email_from_admin;
                ctx.reply(enter_pro_student_email_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentWhatsUpNumber = no_contact_number;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentWhatsUpNumber,
                };
                ctx.session.state = state_list.get_pro_student_email_from_admin;
                ctx.reply(enter_pro_student_email_message, skip_from_this_step_buttons);
            } else {
                ctx.reply(text_message_only, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
        }
    }, [state_list.get_pro_student_email_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentEmail = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentEmail,
                    };
                    ctx.session.state = state_list.get_pro_student_city_from_admin;
                    ctx.reply(enter_pro_student_city_message, dont_change);
                } else {
                    const proStudentEmail = ctx.session.student.email;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentEmail,
                    };
                    ctx.session.state = state_list.get_pro_student_city_from_admin;
                    ctx.reply(enter_pro_student_city_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentEmail = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentEmail,
                };
                ctx.session.state = state_list.get_pro_student_city_from_admin;
                ctx.reply(enter_pro_student_city_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentEmail = no_email;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentEmail,
                };
                ctx.session.state = state_list.get_pro_student_city_from_admin;
                ctx.reply(enter_pro_student_city_message, skip_from_this_step_buttons);
            } else {
                ctx.reply(text_message_only, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
        }
    }, [state_list.get_pro_student_city_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentCity = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentCity,
                    };
                    ctx.session.state = state_list.register_pro_student_by_admin;
                    ctx.reply(await pro_student_registration_preview(ctx.session.stateData), accept_discard_buttons);
                } else {
                    const proStudentCity = await ctx.session.student.city;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentCity,
                    };
                    ctx.session.state = state_list.register_pro_student_by_admin;
                    ctx.reply(await pro_student_registration_preview(ctx.session.stateData), accept_discard_buttons);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentCity = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentCity,
                };
                ctx.session.state = state_list.register_pro_student_by_admin;
                ctx.reply(await pro_student_registration_preview(ctx.session.stateData), accept_discard_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentCity = no_city;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentCity,
                };
                ctx.session.state = state_list.register_pro_student_by_admin;
                ctx.reply(await pro_student_registration_preview(ctx.session.stateData), accept_discard_buttons);
            } else {
                ctx.reply(text_message_only, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
        }
    }, [state_list.register_pro_student_by_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.session.status === "update" && ctx.message.text === all_buttons_text.accept) {
            const student = await ProStudentModel.findById(ctx.session.student._id.toString());
            if (student) {
                const student = await ProStudentModel.findByIdAndUpdate(ctx.session.student._id.toString(), {
                    plan_id: ctx.session.stateData.planId,
                    fullname: ctx.session.stateData.proStudentFullName,
                    field: ctx.session.stateData.proStudentField,
                    grade: ctx.session.stateData.proStudentGrade,
                    level: ctx.session.stateData.proStudentLevel,
                    phone_number: ctx.session.stateData.proStudentPhoneNumber,
                    whats_up_number: ctx.session.stateData.proStudentWhatsUpNumber,
                    email: ctx.session.stateData.proStudentEmail,
                    city: ctx.session.stateData.proStudentCity,
                    userName: ctx.session.stateData.proStudentUserName,
                    chat_id: null,
                    is_pro: true,
                }, {new: true});
                await student.save();
                ctx.session = undefined;
                return ctx.reply(information_updated_message, manage_pro_students_buttons);
            } else {
                ctx.session = undefined;
                return ctx.reply(error_updating_information_message, manage_pro_students_buttons);
            }
        } else if (ctx.session.status === "update" && ctx.message.text === all_buttons_text.discard) {
            ctx.session = undefined;
            return ctx.reply(information_update_canceled_message, manage_pro_students_buttons);
        }

        if (ctx.session.status !== "update" && ctx.message.text === all_buttons_text.accept) {
            const newProStudent = await new ProStudentModel({
                plan_id: ctx.session.stateData.planId,
                fullname: ctx.session.stateData.proStudentFullName,
                field: ctx.session.stateData.proStudentField,
                grade: ctx.session.stateData.proStudentGrade,
                level: ctx.session.stateData.proStudentLevel,
                phone_number: ctx.session.stateData.proStudentPhoneNumber,
                whats_up_number: ctx.session.stateData.proStudentWhatsUpNumber,
                email: ctx.session.stateData.proStudentEmail,
                city: ctx.session.stateData.proStudentCity,
                userName: ctx.session.stateData.proStudentUserName,
                chat_id: null,
                is_pro: true,
            });
            await newProStudent.save();
            ctx.reply(student_registered_message, admin_start_buttons);
        } else if (ctx.session.status !== "update" && ctx.message.text === all_buttons_text.discard) {
            ctx.session.stateData = undefined;
            ctx.reply(student_registration_canceled_message, manage_pro_students_buttons);
        } else {
            ctx.session.stateData = undefined;
            ctx.reply(text_message_only, manage_pro_students_buttons);
        }
    }, [state_list.accept_student]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.studentId);
            if (student) {
                student = await ProStudentModel.findByIdAndUpdate(ctx.session.studentId, {
                    is_pro: true,
                }, {new: true});
                await student.save();
                ctx.reply(the_student_became_a_pro_student_message, admin_start_buttons);
                await ctx.telegram.sendMessage(student.chat_id, you_have_been_accepted_message);
                ctx.session = undefined;
            } else {
                ctx.reply(this_student_has_already_been_removed_message, admin_start_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, admin_start_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, admin_start_buttons);
            ctx.session = undefined;
        }
    }, [state_list.reject_student]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.studentId);
            if (student) {
                await ProStudentModel.findByIdAndDelete(ctx.session.studentId);
                ctx.reply(the_student_was_not_accepted_message, admin_start_buttons);
                ctx.session = undefined;
                await ctx.telegram.sendMessage(student.chat_id, registration_has_not_been_completed_message);
            } else {
                ctx.reply(this_student_has_already_been_removed_message, admin_start_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, admin_start_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, admin_start_buttons);
            ctx.session = undefined;
        }
    }, [state_list.delete_student]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.studentId);
            if (student) {
                await ProStudentModel.findByIdAndDelete(ctx.session.studentId);
                ctx.reply("دانش آموز با موفقیت پذیرفته شد.", admin_start_buttons);
                ctx.session = undefined;
                await ctx.telegram.sendMessage(student.chat_id, "شما در طرح رد گزینه پرو پذیرفته شدید منتظر تماس مشاور باشید.");
            } else {
                ctx.reply("این دانش آموز در حال حاظر پذیرفته شده است.", admin_start_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, admin_start_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, admin_start_buttons);
            ctx.session = undefined;
        }
    }, [state_list.remove_student]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let proStudent = await ProStudentModel.findById(ctx.session.studentId);
            if (proStudent) {
                await ProStudentModel.findByIdAndDelete(ctx.session.studentId);
                ctx.reply(the_student_was_removed_message, manage_pro_students_buttons);
                ctx.session = undefined;
            } else {
                ctx.reply(this_student_has_already_been_removed_message, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, manage_pro_students_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, manage_pro_students_buttons);
            ctx.session = undefined;
        }
    },
}