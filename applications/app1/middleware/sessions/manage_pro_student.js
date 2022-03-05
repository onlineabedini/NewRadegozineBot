const ProStudentModel = require("../../models/ProStudent");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {manage_pro_students_buttons} = require("../../buttons/admin_buttons/manage_pro_students_buttons");
const {dont_change} = require("../../buttons/similar_buttons/dont_change");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {enter_field_buttons} = require("../../buttons/similar_buttons/enter_field_buttons");
const {enter_grade_buttons} = require("../../buttons/similar_buttons/enter_grade_buttons");
const {enter_level_buttons} = require("../../buttons/similar_buttons/enter_level_buttons");
const {skip_from_this_step_buttons} = require("../../buttons/similar_buttons/skip_from_this_step");
const {accept_discard_buttons} = require("../../buttons/similar_buttons/accept_discard_buttons");

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
    student_registration_canceled_message, the_student_was_successfully_accepted_message,
    this_student_is_currently_accepted_message
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
const {you_have_been_accepted_in_the_radegozine_pro_plan_message} = require("../../messages/student_messages");


module.exports = {
    [state_list.get_pro_student_fullname_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.session.status === "update") {
                    if (ctx.message.text !== all_buttons_text.dont_change) {
                        const student_fullname = ctx.message.text;
                        ctx.session.state_data = {
                            ...ctx.session.state_data, student_fullname,
                        };
                        ctx.session.state = state_list.get_pro_student_username_from_admin;
                        ctx.reply(enter_pro_student_user_name_message, dont_change);
                    } else {
                        const student_fullname = ctx.session.student.fullname;
                        ctx.session.state_data = {
                            ...ctx.session.state_data, student_fullname,
                        };
                        ctx.session.state = state_list.get_pro_student_username_from_admin;
                        ctx.reply(enter_pro_student_user_name_message, dont_change);
                    }
                } else {
                    const student_fullname = ctx.message.text;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_fullname,
                    };
                    ctx.session.state = state_list.get_pro_student_username_from_admin;
                    ctx.reply(enter_pro_student_user_name_message, cancel_button);
                }
            } else {
                ctx.session.state = state_list.get_pro_student_fullname_from_admin
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_pro_student_username_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.session.status === "update") {
                    if (ctx.message.text !== all_buttons_text.dont_change) {
                        const student_username = ctx.message.text.split("@")[1];
                        if (student_username) {
                            ctx.session.state_data = {
                                ...ctx.session.state_data, student_username,
                            };
                            ctx.session.state = state_list.get_pro_student_field_from_admin;
                            ctx.reply(enter_pro_student_field_message, enter_field_buttons);
                        } else {
                            ctx.session.state = state_list.get_pro_student_username_from_admin
                            ctx.reply(invalid_username_entered_message);
                        }
                    } else {
                        const student_username = ctx.session.student.username;
                        ctx.session.state_data = {
                            ...ctx.session.state_data, student_username,
                        };
                        ctx.session.state = state_list.get_pro_student_field_from_admin;
                        ctx.reply(enter_pro_student_field_message, enter_field_buttons);
                    }
                } else {
                    const student_username = ctx.message.text.split("@")[1];
                    if (student_username) {
                        ctx.session.state_data = {
                            ...ctx.session.state_data, student_username,
                        };
                        ctx.session.state = state_list.get_pro_student_field_from_admin;
                        ctx.reply(enter_pro_student_field_message, enter_field_buttons);
                    } else {
                        ctx.session.state = state_list.get_pro_student_username_from_admin
                        ctx.reply(invalid_username_entered_message);
                    }
                }
            } else {
                ctx.session.state = state_list.get_pro_student_username_from_admin
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_pro_student_field_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi ||
                ctx.message.text === all_buttons_text.tajrobi ||
                ctx.message.text === all_buttons_text.ensani ||
                ctx.message.text === all_buttons_text.honar ||
                ctx.message.text === all_buttons_text.zaban ||
                ctx.message.text === all_buttons_text.other_fields) {
                const student_field = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_field,
                };
                ctx.session.state = state_list.get_pro_student_grade_from_admin;
                ctx.reply(enter_pro_student_grade_message, enter_grade_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_field_from_admin
                ctx.reply(invalid_username_entered_message);
            }
        }
    }, [state_list.get_pro_student_grade_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth ||
                ctx.message.text === all_buttons_text.eleventh ||
                ctx.message.text === all_buttons_text.twelfth) {
                const student_grade = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_grade,
                };
                ctx.session.state = state_list.get_pro_student_level_from_admin;
                ctx.reply(enter_pro_student_level_message, enter_level_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_grade_from_admin
                ctx.reply(invalid_username_entered_message);
            }
        }
    }, [state_list.get_pro_student_level_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.low ||
                ctx.message.text === all_buttons_text.medium ||
                ctx.message.text === all_buttons_text.high |
                ctx.message.text === all_buttons_text.genius) {
                const student_level = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_level,
                };
                ctx.session.state = state_list.get_pro_student_phone_number_from_admin;
                if (ctx.session.status === "update") return ctx.reply(enter_pro_student_phone_number_message, dont_change);
                ctx.reply(enter_pro_student_phone_number_message, skip_from_this_step_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_level_from_admin
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_pro_student_phone_number_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const student_phone_number = ctx.message.text;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_phone_number,
                    };
                    ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin;
                    ctx.reply(enter_pro_student_whats_up_number_message, dont_change);
                } else {
                    const student_phone_number = ctx.session.student.phone_number;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_phone_number,
                    };
                    ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin;
                    ctx.reply(enter_pro_student_whats_up_number_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const student_phone_number = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_phone_number,
                };
                ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin;
                ctx.reply(enter_pro_student_whats_up_number_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const student_phone_number = no_contact_number;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_phone_number,
                };
                ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin;
                ctx.reply(enter_pro_student_whats_up_number_message, skip_from_this_step_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_phone_number_from_admin;
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_pro_student_whats_up_number_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const student_whats_up_number = ctx.message.text;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_whats_up_number,
                    };
                    ctx.session.state = state_list.get_pro_student_email_from_admin;
                    ctx.reply(enter_pro_student_email_message, dont_change);
                } else {
                    const student_whats_up_number = ctx.session.student.whats_up_number;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_whats_up_number,
                    };
                    ctx.session.state = state_list.get_pro_student_email_from_admin;
                    ctx.reply(enter_pro_student_email_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const student_whats_up_number = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_whats_up_number,
                };
                ctx.session.state = state_list.get_pro_student_email_from_admin;
                ctx.reply(enter_pro_student_email_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const student_whats_up_number = no_contact_number;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_whats_up_number,
                };
                ctx.session.state = state_list.get_pro_student_email_from_admin;
                ctx.reply(enter_pro_student_email_message, skip_from_this_step_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_whats_up_number_from_admin
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_pro_student_email_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const student_email = ctx.message.text;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_email,
                    };
                    ctx.session.state = state_list.get_pro_student_city_from_admin;
                    ctx.reply(enter_pro_student_city_message, dont_change);
                } else {
                    const student_email = ctx.session.student.email;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_email,
                    };
                    ctx.session.state = state_list.get_pro_student_city_from_admin;
                    ctx.reply(enter_pro_student_city_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const student_email = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_email,
                };
                ctx.session.state = state_list.get_pro_student_city_from_admin;
                ctx.reply(enter_pro_student_city_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const student_email = no_email;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_email,
                };
                ctx.session.state = state_list.get_pro_student_city_from_admin;
                ctx.reply(enter_pro_student_city_message, skip_from_this_step_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_email_from_admin;
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_pro_student_city_from_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const student_city = ctx.message.text;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_city,
                    };
                    ctx.session.state = state_list.register_pro_student_by_admin;
                    ctx.reply(await pro_student_registration_preview(ctx.session.state_data), accept_discard_buttons);
                } else {
                    const student_city = ctx.session.student.city;
                    ctx.session.state_data = {
                        ...ctx.session.state_data, student_city,
                    };
                    ctx.session.state = state_list.register_pro_student_by_admin;
                    ctx.reply(await pro_student_registration_preview(ctx.session.state_data), accept_discard_buttons);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const student_city = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_city,
                };
                ctx.session.state = state_list.register_pro_student_by_admin;
                ctx.reply(await pro_student_registration_preview(ctx.session.state_data), accept_discard_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const student_city = no_city;
                ctx.session.state_data = {
                    ...ctx.session.state_data, student_city,
                };
                ctx.session.state = state_list.register_pro_student_by_admin;
                ctx.reply(await pro_student_registration_preview(ctx.session.state_data), accept_discard_buttons);
            } else {
                ctx.session.state = state_list.get_pro_student_city_from_admin
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.register_pro_student_by_admin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.session.status === "update" && ctx.message.text === all_buttons_text.accept) {
            let student = await ProStudentModel.findByIdAndUpdate(ctx.session.student._id.toString(), {
                plan_id: ctx.session.state_data.plan_id,
                fullname: ctx.session.state_data.student_fullname,
                field: ctx.session.state_data.student_field,
                grade: ctx.session.state_data.student_grade,
                level: ctx.session.state_data.student_level,
                phone_number: ctx.session.state_data.student_phone_number,
                whats_up_number: ctx.session.state_data.student_whats_up_number,
                email: ctx.session.state_data.student_email,
                city: ctx.session.state_data.student_city,
                username: ctx.session.state_data.student_username,
                chat_id: null,
                is_pro: true,
            }, {new: true});
            await student.save();
            ctx.session = undefined;
            return ctx.reply(information_updated_message, manage_pro_students_buttons);
        } else if (ctx.session.status === "update" && ctx.message.text === all_buttons_text.discard) {
            ctx.session = undefined;
            return ctx.reply(information_update_canceled_message, manage_pro_students_buttons);
        }
        if (ctx.session.status !== "update" && ctx.message.text === all_buttons_text.accept) {
            const new_pro_student = await new ProStudentModel({
                plan_id: ctx.session.state_data.plan_id,
                fullname: ctx.session.state_data.student_fullname,
                field: ctx.session.state_data.student_field,
                grade: ctx.session.state_data.student_grade,
                level: ctx.session.state_data.student_level,
                phone_number: ctx.session.state_data.student_phone_number,
                whats_up_number: ctx.session.state_data.student_whats_up_number,
                email: ctx.session.state_data.student_email,
                city: ctx.session.state_data.student_city,
                username: ctx.session.state_data.student_username,
                chat_id: null,
                is_pro: true,
            });
            await new_pro_student.save();
            ctx.session = undefined
            ctx.reply(student_registered_message, manage_pro_students_buttons);
        } else if (ctx.session.status !== "update" && ctx.message.text === all_buttons_text.discard) {
            ctx.session = undefined;
            ctx.reply(student_registration_canceled_message, manage_pro_students_buttons);
        } else {
            ctx.session = undefined;
            ctx.reply(text_message_only, manage_pro_students_buttons);
        }
    }, [state_list.accept_student]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.student_id);
            if (student) {
                student = await ProStudentModel.findByIdAndUpdate(student._id, {
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
            let student = await ProStudentModel.findById(ctx.session.student_id);
            if (student) {
                await ProStudentModel.findByIdAndDelete(student._id);
                ctx.reply(the_student_was_not_accepted_message, admin_start_buttons);
                await ctx.telegram.sendMessage(student.chat_id, registration_has_not_been_completed_message);
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
    }, [state_list.delete_student]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.student_id);
            if (student) {
                await ProStudentModel.findByIdAndDelete(student._id);
                ctx.reply(the_student_was_successfully_accepted_message , admin_start_buttons);
                await ctx.telegram.sendMessage(student.chat_id, you_have_been_accepted_in_the_radegozine_pro_plan_message );
                ctx.session = undefined;
            } else {
                ctx.reply( this_student_is_currently_accepted_message , admin_start_buttons);
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
            let student = await ProStudentModel.findById(ctx.session.student_id);
            if (student) {
                await ProStudentModel.findByIdAndDelete(student._id);
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