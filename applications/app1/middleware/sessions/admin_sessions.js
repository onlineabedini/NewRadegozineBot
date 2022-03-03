//import models
const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const ProStudentModel = require("../../models/ProStudent");
const UserModel = require("../../models/User");
const PlanModel = require("../../models/Plan");
const ChannelModel = require("../../models/Channel");
const ContentModel = require("../../models/Content");

//import stateList
const stateList = require("../stateList");

//import buttons
const {
    admin_start_buttons,
} = require("../../buttons/admin_buttons/admin_start_buttons");
const {
    cancel_button,
} = require("../../buttons/similar_buttons/cancel_button");

//import messages
const {
    enter_admin_fullname_message,
    enter_adviser_fullname_message,
    invalid_username_entered_message,
    admin_removed_message,
    adviser_removed_message,
    no_admin_found_message,
    no_adviser_found_message,
    duplicate_admin_message,
    admin_registrated_message,
    adviser_registrated_message,
    duplicate_adviser_message,
    your_message_has_been_sent_to_advisers_message,
    plan_caption,
    pro_student_registration_preview,
    The_adviser_was_promoted,
    no_adviser_found_with_this_username,
    The_adviser_was_demoted,
    enter_plan_price_message,
    enter_plan_description_message,
    enter_plan_image_message,
    plan_registered_message,
    duplicate_plan_message,
    no_user_found,
    enter_pro_student_user_name_message,
    enter_pro_student_field_message,
    enter_pro_student_grade_message,
    enter_pro_student_level_message,
    enter_pro_student_phone_number_message,
    enter_pro_student_whats_up_number_message,
    enter_pro_student_email_message,
    enter_pro_student_city_message,
    student_registered_message,
    student_registration_canceled_message,
    adviser_accepted_message,
    adviser_not_found,
    adding_plan_was_canceled,
    the_student_became_a_pro_student_message,
    this_student_has_already_been_removed_message,
    this_adviser_has_already_been_removed_message,
    the_student_was_not_accepted_message,
    this_plan_has_already_been_removed_message,
    the_plan_was_removed_message,
    the_student_was_removed_message,
} = require("../../messages/admin_messages");
const {
    text_message_only,
    select_an_item_message,
    something_went_wrong,
    message_sent_successfully,
    your_request_has_been_canceled,
    you_have_been_accepted_message,
    information_updated_message,
    error_updating_information_message,
    information_update_canceled_message,
    input_is_invalid_message,
    no_contact_number,
    no_email,
    registration_has_not_been_completed_message,
    no_city,
    no_channel_found_message,
} = require("../../messages/similar_messages");
const {
    manage_plans_buttons,
} = require("../../buttons/admin_buttons/manage_plans_buttons");

const {
    manage_content_production_buttons,
} = require("../../buttons/admin_buttons/manage_content_production_buttons");

const {
    accept_discard_buttons,
} = require("../../buttons/similar_buttons/accept_discard_buttons");
const {
    manage_pro_students_buttons,
} = require("../../buttons/admin_buttons/manage_pro_students_buttons");

const {
    enter_field_buttons,
} = require("../../buttons/similar_buttons/enter_field_buttons");
const {
    enter_grade_buttons,
} = require("../../buttons/similar_buttons/enter_grade_buttons");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const {
    manage_admins_buttons,
} = require("../../buttons/admin_buttons/manage_admins_buttons");
const {
    manage_advisers_buttons,
} = require("../../buttons/admin_buttons/manage_advisers_buttons");
const {
    skip_from_this_step_buttons,
} = require("../../buttons/similar_buttons/skip_from_this_step");
const e = require("express");
const {
    enter_level_buttons,
} = require("../../buttons/similar_buttons/enter_level_buttons");
const {dont_change} = require("../../buttons/similar_buttons/dont_change");
const {
    send_message_buttons,
} = require("../../buttons/admin_buttons/send_message_buttons");

module.exports = {
    [stateList.addAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = await ctx.message.text;
                const adminUserName = inputUserName.split("@")[1];
                if (adminUserName) {
                    ctx.session.stateData = {...ctx.session.stateData, adminUserName};
                    ctx.session.state = stateList.getAdminFullName;
                    ctx.reply(enter_admin_fullname_message);
                } else {
                    ctx.reply(invalid_username_entered_message, manage_admins_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_admins_buttons);
            }
        }
    }, [stateList.removeAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adminUserName = inputUserName.split("@")[1];
                const admin = await AdminModel.findOne({userName: adminUserName});
                if (admin) {
                    await AdminModel.findOneAndDelete({userName: adminUserName});
                    ctx.reply(admin_removed_message, manage_admins_buttons);
                } else {
                    ctx.reply(no_admin_found_message, manage_admins_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_admins_buttons);
            }
        }
    }, [stateList.getAdminFullName]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel_button) {
            if (ctx.message.text) {
                const adminFullName = ctx.message.text;
                ctx.session.stateData = {...ctx.session.stateData, adminFullName};
                const adminData = await AdminModel.findOne({
                    userName: ctx.session.stateData.adminUserName,
                });
                if (!adminData) {
                    const newAdmin = new AdminModel({
                        userName: ctx.session.stateData.adminUserName,
                        userFullName: ctx.session.stateData.adminFullName,
                    });
                    await newAdmin.save();
                    ctx.session.stateData = undefined;
                    ctx.reply(admin_registrated_message, admin_start_buttons);
                } else {
                    ctx.session.stateData = undefined;
                    ctx.reply(duplicate_admin_message, admin_start_buttons);
                }
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_admins_buttons);
            }
        }
    }, [stateList.addAdviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adviserUserName = inputUserName.split("@")[1];
                if (adviserUserName) {
                    ctx.session.stateData = {...ctx.session.stateData, adviserUserName};
                    ctx.session.state = stateList.getAdviserFullName;
                    ctx.reply(enter_adviser_fullname_message);
                } else {
                    ctx.reply(invalid_username_entered_message, manage_advisers_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_advisers_buttons);
            }
        }
    }, [stateList.removeAdviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputText = ctx.message.text;
                const adviserUserName = inputText.split("@")[1];
                const adviser = await AdviserModel.findOne({
                    userName: adviserUserName,
                });
                if (adviser) {
                    await AdviserModel.findOneAndDelete({userName: adviserUserName});
                    ctx.reply(adviser_removed_message, manage_advisers_buttons);
                } else {
                    ctx.reply(no_adviser_found_message, manage_advisers_buttons);
                }
            } else {
                ctx.reply(text_message_only, manage_advisers_buttons);
            }
        }
    }, [stateList.promoteAdviser]: async (ctx, next) => {
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
                            isPro: true,
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
    }, [stateList.demoteAdviser]: async (ctx, next) => {
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
                            isPro: false,
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
    }, [stateList.getAdviserFullName]: async (ctx, next) => {
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
                        userFullName: ctx.session.stateData.adviserFullName,
                        isAccepted: true,
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
    }, [stateList.acceptAdviser]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let regAdviser = await AdviserModel.findById(ctx.session.regAdviserId);
            if (regAdviser) {
                regAdviser = await AdviserModel.findByIdAndUpdate(ctx.session.regAdviserId, {
                    isAccepted: true,
                }, {new: true});
                await regAdviser.save();
                await ctx.telegram.sendMessage(regAdviser.userChatId, you_have_been_accepted_message);
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
    }, [stateList.rejectAdviser]: async (ctx, next) => {
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
    }, [stateList.acceptStudent]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.studentId);
            if (student) {
                student = await ProStudentModel.findByIdAndUpdate(ctx.session.studentId, {
                    isPro: true,
                }, {new: true});
                await student.save();
                ctx.reply(the_student_became_a_pro_student_message, admin_start_buttons);
                await ctx.telegram.sendMessage(student.userChatId, you_have_been_accepted_message);
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
    }, [stateList.rejectStudent]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.studentId);
            if (student) {
                await ProStudentModel.findByIdAndDelete(ctx.session.studentId);
                ctx.reply(the_student_was_not_accepted_message, admin_start_buttons);
                ctx.session = undefined;
                await ctx.telegram.sendMessage(student.userChatId, registration_has_not_been_completed_message);
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
    }, [stateList.deleteStudent]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.studentId);
            if (student) {
                await ProStudentModel.findByIdAndDelete(ctx.session.studentId);
                ctx.reply("دانش آموز با موفقیت پذیرفته شد.", admin_start_buttons);
                ctx.session = undefined;
                await ctx.telegram.sendMessage(student.userChatId, "شما در طرح رد گزینه پرو پذیرفته شدید منتظر تماس مشاور باشید.");
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
    },[stateList.removeStudent]: async (ctx, next) => {
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
    }, [stateList.removePlan]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let plan = await PlanModel.findById(ctx.session.planId);
            if (plan) {
                await PlanModel.findByIdAndDelete(ctx.session.planId);
                ctx.reply(the_plan_was_removed_message, manage_plans_buttons);
                ctx.session = undefined;
            } else {
                ctx.reply(this_plan_has_already_been_removed_message, manage_plans_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, manage_plans_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, manage_plans_buttons);
            ctx.session = undefined;
        }
    },
    [stateList.removeContent]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let content = await ContentModel.findById(ctx.session.contentId);
            if (content) {
                await ContentModel.findByIdAndDelete(ctx.session.contentId);
                ctx.reply("این عنوان با موفقیت حذف گردید.", manage_content_production_buttons);
                ctx.session = undefined;
            } else {
                ctx.reply("این عنوان در حال حاضر حذف شده است.", manage_content_production_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, manage_content_production_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, manage_content_production_buttons);
            ctx.session = undefined;
        }
    },
    [stateList.getProStudentFullNameFromAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.session.status === "update") {
                    if (ctx.message.text !== all_buttons_text.dont_change) {
                        const proStudentFullName = await ctx.message.text;
                        ctx.session.stateData = {
                            ...ctx.session.stateData, proStudentFullName,
                        };
                        ctx.session.state = stateList.getProStudentUserNameFromAdmin;
                        ctx.reply(enter_pro_student_user_name_message, dont_change);
                    } else {
                        const proStudentFullName = ctx.session.student.userFullName;
                        ctx.session.stateData = {
                            ...ctx.session.stateData, proStudentFullName,
                        };
                        ctx.session.state = stateList.getProStudentUserNameFromAdmin;
                        ctx.reply(enter_pro_student_user_name_message, dont_change);
                    }
                } else {
                    const proStudentFullName = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentFullName,
                    };
                    ctx.session.state = stateList.getProStudentUserNameFromAdmin;
                    ctx.reply(enter_pro_student_user_name_message, cancel_button);
                }
            } else {
                ctx.session = undefined;
                ctx.reply(text_message_only, manage_pro_students_buttons);
            }
        } else {
            ctx.session = undefined;
        }
    }, [stateList.getProStudentUserNameFromAdmin]: async (ctx, next) => {
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
                            ctx.session.state = stateList.getProStudentFieldFromAdmin;
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
                        ctx.session.state = stateList.getProStudentFieldFromAdmin;
                        ctx.reply(enter_pro_student_field_message, enter_field_buttons);
                    }
                } else {
                    const proStudentUserName = await ctx.message.text.split("@")[1];
                    console.log(proStudentUserName);
                    if (proStudentUserName) {
                        ctx.session.stateData = {
                            ...ctx.session.stateData, proStudentUserName,
                        };
                        ctx.session.state = stateList.getProStudentFieldFromAdmin;
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
    }, [stateList.getProStudentFieldFromAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi || ctx.message.text === all_buttons_text.tajrobi || ctx.message.text === all_buttons_text.ensani || ctx.message.text === all_buttons_text.honar || ctx.message.text === all_buttons_text.zaban || ctx.message.text === all_buttons_text.other_fields) {
                const proStudentField = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentField,
                };
                ctx.session.state = stateList.getProStudentGradeFromAdmin;
                ctx.reply(enter_pro_student_grade_message, enter_grade_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(invalid_username_entered_message, manage_pro_students_buttons);
            }
        }
    }, [stateList.getProStudentGradeFromAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth || ctx.message.text === all_buttons_text.eleventh || ctx.message.text === all_buttons_text.twelfth) {
                const proStudentGrade = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentGrade,
                };
                ctx.session.state = stateList.getProStudentLevelFromAdmin;
                ctx.reply(enter_pro_student_level_message, enter_level_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(invalid_username_entered_message, manage_pro_students_buttons);
            }
        }
    }, [stateList.getProStudentLevelFromAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.low || ctx.message.text === all_buttons_text.medium || ctx.message.text === all_buttons_text.high || ctx.message.text === all_buttons_text.genius) {
                const proStudentLevel = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentLevel,
                };
                ctx.session.state = stateList.getProStudentPhoneNumberFromAdmin;
                if (ctx.session.status === "update") return ctx.reply(enter_pro_student_phone_number_message, dont_change);
                ctx.reply(enter_pro_student_phone_number_message, skip_from_this_step_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_pro_students_buttons);
            }
        }
    }, [stateList.getProStudentPhoneNumberFromAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentPhoneNumber = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentPhoneNumber,
                    };
                    ctx.session.state = stateList.getProStudentWhatsUpNumberFromAdmin;
                    ctx.reply(enter_pro_student_whats_up_number_message, dont_change);
                } else {
                    const proStudentPhoneNumber = ctx.session.student.userPhoneNumber;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentPhoneNumber,
                    };
                    ctx.session.state = stateList.getProStudentWhatsUpNumberFromAdmin;
                    ctx.reply(enter_pro_student_whats_up_number_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentPhoneNumber = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentPhoneNumber,
                };
                ctx.session.state = stateList.getProStudentWhatsUpNumberFromAdmin;
                ctx.reply(enter_pro_student_whats_up_number_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentPhoneNumber = no_contact_number;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentPhoneNumber,
                };
                ctx.session.state = stateList.getProStudentWhatsUpNumberFromAdmin;
                ctx.reply(enter_pro_student_whats_up_number_message, skip_from_this_step_buttons);
            } else {
                ctx.reply(text_message_only, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
        }
    }, [stateList.getProStudentWhatsUpNumberFromAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentWhatsUpNumber = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentWhatsUpNumber,
                    };
                    ctx.session.state = stateList.getProStudentEmailFromAdmin;
                    ctx.reply(enter_pro_student_email_message, dont_change);
                } else {
                    const proStudentWhatsUpNumber = ctx.session.student.userWhatsUpNumber;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentWhatsUpNumber,
                    };
                    ctx.session.state = stateList.getProStudentEmailFromAdmin;
                    ctx.reply(enter_pro_student_email_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentWhatsUpNumber = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentWhatsUpNumber,
                };
                ctx.session.state = stateList.getProStudentEmailFromAdmin;
                ctx.reply(enter_pro_student_email_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentWhatsUpNumber = no_contact_number;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentWhatsUpNumber,
                };
                ctx.session.state = stateList.getProStudentEmailFromAdmin;
                ctx.reply(enter_pro_student_email_message, skip_from_this_step_buttons);
            } else {
                ctx.reply(text_message_only, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
        }
    }, [stateList.getProStudentEmailFromAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentEmail = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentEmail,
                    };
                    ctx.session.state = stateList.getProStudentCityFromAdmin;
                    ctx.reply(enter_pro_student_city_message, dont_change);
                } else {
                    const proStudentEmail = ctx.session.student.userEmail;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentEmail,
                    };
                    ctx.session.state = stateList.getProStudentCityFromAdmin;
                    ctx.reply(enter_pro_student_city_message, dont_change);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentEmail = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentEmail,
                };
                ctx.session.state = stateList.getProStudentCityFromAdmin;
                ctx.reply(enter_pro_student_city_message, skip_from_this_step_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentEmail = no_email;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentEmail,
                };
                ctx.session.state = stateList.getProStudentCityFromAdmin;
                ctx.reply(enter_pro_student_city_message, skip_from_this_step_buttons);
            } else {
                ctx.reply(text_message_only, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
        }
    }, [stateList.getProStudentCityFromAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentCity = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentCity,
                    };
                    ctx.session.state = stateList.registerProStudentByAdmin;
                    ctx.reply(await pro_student_registration_preview(ctx.session.stateData), accept_discard_buttons);
                } else {
                    const proStudentCity = await ctx.session.student.userCity;
                    ctx.session.stateData = {
                        ...ctx.session.stateData, proStudentCity,
                    };
                    ctx.session.state = stateList.registerProStudentByAdmin;
                    ctx.reply(await pro_student_registration_preview(ctx.session.stateData), accept_discard_buttons);
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentCity = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentCity,
                };
                ctx.session.state = stateList.registerProStudentByAdmin;
                ctx.reply(await pro_student_registration_preview(ctx.session.stateData), accept_discard_buttons);
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentCity = no_city;
                ctx.session.stateData = {
                    ...ctx.session.stateData, proStudentCity,
                };
                ctx.session.state = stateList.registerProStudentByAdmin;
                ctx.reply(await pro_student_registration_preview(ctx.session.stateData), accept_discard_buttons);
            } else {
                ctx.reply(text_message_only, manage_pro_students_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
        }
    }, [stateList.registerProStudentByAdmin]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.session.status === "update" && ctx.message.text === all_buttons_text.accept) {
            const student = await ProStudentModel.findById(ctx.session.student._id.toString());
            if (student) {
                const student = await ProStudentModel.findByIdAndUpdate(ctx.session.student._id.toString(), {
                    userPlanId: ctx.session.stateData.planId,
                    userFullName: ctx.session.stateData.proStudentFullName,
                    userField: ctx.session.stateData.proStudentField,
                    userGrade: ctx.session.stateData.proStudentGrade,
                    userLevel: ctx.session.stateData.proStudentLevel,
                    userPhoneNumber: ctx.session.stateData.proStudentPhoneNumber,
                    userWhatsUpNumber: ctx.session.stateData.proStudentWhatsUpNumber,
                    userEmail: ctx.session.stateData.proStudentEmail,
                    userCity: ctx.session.stateData.proStudentCity,
                    userName: ctx.session.stateData.proStudentUserName,
                    userChatId: null,
                    isPro: true,
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
                userPlanId: ctx.session.stateData.planId,
                userFullName: ctx.session.stateData.proStudentFullName,
                userField: ctx.session.stateData.proStudentField,
                userGrade: ctx.session.stateData.proStudentGrade,
                userLevel: ctx.session.stateData.proStudentLevel,
                userPhoneNumber: ctx.session.stateData.proStudentPhoneNumber,
                userWhatsUpNumber: ctx.session.stateData.proStudentWhatsUpNumber,
                userEmail: ctx.session.stateData.proStudentEmail,
                userCity: ctx.session.stateData.proStudentCity,
                userName: ctx.session.stateData.proStudentUserName,
                userChatId: null,
                isPro: true,
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
    },

    [stateList.getPlanTitle]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planTitle = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, planTitle,
                };
                ctx.session.state = stateList.getPlanPrice;
                ctx.reply(enter_plan_price_message, cancel_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_plans_buttons);
            }
        }
    }, [stateList.getPlanPrice]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planPrice = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, planPrice,
                };
                ctx.session.state = stateList.getPlanDescription;
                ctx.reply(enter_plan_description_message, cancel_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_plans_buttons);
            }
        }
    }, [stateList.getPlanDescription]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planDescription = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, planDescription,
                };
                ctx.session.state = stateList.getPlanImage;
                ctx.reply(enter_plan_image_message, skip_from_this_step_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_plans_buttons);
            }
        }
    }, [stateList.getPlanImage]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.photo) {
                const planImage = ctx.message.photo[0].file_id;
                ctx.session.stateData = {...ctx.session.stateData, planImage};
                ctx.session.state = stateList.registerPlan;
                await ctx.replyWithPhoto(planImage, {
                    caption: plan_caption(ctx.session.stateData),
                });
                ctx.reply(select_an_item_message, accept_discard_buttons);
            } else if (ctx.message.text === all_buttons_text.skip_from_this_step) {
                const planImage = "static/img/sample_img.jpg";
                ctx.session.stateData = {...ctx.session.stateData, planImage};
                ctx.session.state = stateList.registerPlan;
                await ctx.replyWithPhoto({source: planImage}, {caption: plan_caption(ctx.session.stateData)});
                ctx.reply(select_an_item_message, accept_discard_buttons);
            }
        }
    }, [stateList.registerPlan]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.accept) {
            const plan = await PlanModel.findOne({
                planTitle: ctx.session.stateData.planTitle,
            });
            if (!plan) {
                const newPlan = await new PlanModel({
                    planTitle: ctx.session.stateData.planTitle,
                    planPrice: ctx.session.stateData.planPrice,
                    planDescription: ctx.session.stateData.planDescription,
                    planImage: ctx.session.stateData.planImage,
                });
                await newPlan.save();
                ctx.session.stateData = undefined;
                ctx.reply(plan_registered_message, admin_start_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(duplicate_plan_message, admin_start_buttons);
            }
        } else if (ctx.message.text === all_buttons_text.discard) {
            ctx.session.stateData = undefined;
            ctx.reply(adding_plan_was_canceled, admin_start_buttons);
        } else {
            ctx.session.stateData = undefined;
            ctx.reply(something_went_wrong, admin_start_buttons);
        }
    },

    [stateList.sendMessageForAdvisers]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const advisers = await AdviserModel.find();
            if (advisers.length !== 0) {
                await advisers.forEach((adviser) => {
                    ctx.telegram.forwardMessage(adviser.userChatId, ctx.chat.id, ctx.message.message_id);
                });
                ctx.reply(your_message_has_been_sent_to_advisers_message, admin_start_buttons);
            } else {
                ctx.reply(no_adviser_found_message, admin_start_buttons);
            }
        }
    }, [stateList.sendMessageForAllUsers]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const users = await UserModel.find();
            if (users.length !== 0) {
                await users.forEach((user) => {
                    ctx.telegram.forwardMessage(user.userChatId, ctx.chat.id, ctx.message.message_id);
                });
                ctx.reply(message_sent_successfully, admin_start_buttons);
            } else {
                ctx.reply(no_user_found, admin_start_buttons);
            }
        }
    }, [stateList.sendMessageForRegStudents]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            await ctx.telegram.forwardMessage(ctx.session.stateData.userChatId, ctx.chat.id, ctx.message.message_id);
            ctx.session.stateData = undefined;
            ctx.reply(message_sent_successfully, admin_start_buttons);
        } else {
            ctx.session.stateData = undefined;
            ctx.reply(select_an_item_message, admin_start_buttons);
        }
    }, [stateList.sendMessageForChannels]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const channels = await ChannelModel.find();
            if (channels.length !== 0) {
                await channels.forEach((channel) => {
                    ctx.telegram.copyMessage(channel.channelChatId, ctx.chat.id, ctx.message.message_id);
                });
                ctx.reply(message_sent_successfully, send_message_buttons);
                ctx.session = undefined;
            } else {
                ctx.reply(no_channel_found_message, send_message_buttons);
                ctx.session = undefined;
            }
        } else {
            ctx.session = undefined;
            ctx.reply(select_an_item_message, send_message_buttons);
        }
    }, [stateList.getContentTitle]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const contentTitle = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, contentTitle,
                };
                ctx.session.state = stateList.getContentDescription;
                ctx.reply("لطفا توضیحاتی را در این باره وارد نمایید : ", cancel_button);
            } else {
                ctx.session = undefined;
                ctx.reply(text_message_only, manage_content_production_buttons);
            }
        }
    }, [stateList.getContentDescription]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const contentDescription = await ctx.message.text;
                const content = await ContentModel.findById(ctx.session.contentId);
                if (content && ctx.session.status === "update") {
                    await ContentModel.findByIdAndUpdate(ctx.session.contentId, {
                        contentTitle: ctx.session.stateData.contentTitle, contentDescription,
                    }, {new: true});
                    ctx.session = undefined;
                    ctx.reply("عنوان تولید محتوا با موفقیت ویراش شد.", manage_content_production_buttons);
                } else if (ctx.session.status === "create") {
                    const newContent = new ContentModel({
                        contentTitle: ctx.session.stateData.contentTitle, contentDescription,
                    });
                    await newContent.save();
                    ctx.session = undefined;
                    ctx.reply("عنوان تولید محتوا با موفقیت ثبت شد.", manage_content_production_buttons);
                } else {
                    ctx.session = undefined;
                    ctx.reply("این عنوان قبلا حذف شده است.", manage_content_production_buttons);
                }
            } else {
                ctx.session = undefined;
                ctx.reply(text_message_only, manage_content_production_buttons);
            }
        }
    },
};
