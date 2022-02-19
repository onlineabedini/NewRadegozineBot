//import models
const AdminModel = require("../../../models/Admin");
const AdviserModel = require("../../../models/Adviser");
const UserModel = require("../../../models/User");
const PlanModel = require("../../../models/Plan");
const ProStudentModel = require("../../../models/ProStudent");

//import stateList
const stateList = require("../../stateList");

//import buttons

const {
    admin_start_buttons,
} = require("../../../buttons/admin_buttons/admin_start_buttons");
const {
    cancel_button,
} = require("../../../buttons/similar_buttons/cancel_button");

//import messages
const {
    enterAdminFullname,
    enterAdviserFullname,
    enteredUsernameIsInvalid,
    adminRemoved,
    adviserRemoved,
    noAdminExist,
    noAdviserExist,
    duplicateAdmin,
    adminRegistrated,
    adviserRegistrated,
    duplicateAdviser,
    messageSentToAdvisers,
    noAdviserAdded,
    messageSentToStudents,
    noStudentExist,
    planCaption, pro_student_preview,
} = require("../../../messages/adminMessages");
const {
    onlyTextMessage,
} = require("../../../messages/similarMessages");
const {
    manage_plans_buttons,
} = require("../../../buttons/admin_buttons/manage_plans_buttons");

const {
    acceptDiscardButtonsText, accept_discard_buttons,
} = require("../../../buttons/similar_buttons/accept_discard_buttons");
const {
    manage_pro_students_buttons
} = require("../../../buttons/admin_buttons/manage_pro_students_buttons");

const {
    enter_field_buttons
} = require("../../../buttons/similar_buttons/enter_field_buttons");
const {
    enter_grade_buttons
} = require("../../../buttons/similar_buttons/enter_grade_buttons");
const {all_buttons_text} = require("../../../buttons/all_keyborad_text");
const {manage_admins_buttons} = require("../../../buttons/admin_buttons/manage_admins_buttons");
const {manage_advisers_buttons} = require("../../../buttons/admin_buttons/manage_advisers_buttons");
const {
    skip_from_this_step_buttons
} = require("../../../buttons/similar_buttons/skip_from_this_step");
const e = require("express");
const {enter_level_buttons} = require("../../../buttons/similar_buttons/enter_level_buttons");
const {dont_change} = require("../../../buttons/similar_buttons/dont_change");

//define AdminService class
// create an instance
module.exports = new (class AdminService {
    async addAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = await ctx.message.text;
                const adminUserName = inputUserName.split("@")[1];
                if (adminUserName) {
                    ctx.session.stateData = {...ctx.session.stateData, adminUserName};
                    ctx.session.state = stateList.getAdminFullName;
                    ctx.reply(enterAdminFullname);
                } else {
                    ctx.reply(enteredUsernameIsInvalid, manage_admins_buttons);
                }
            } else {
                ctx.reply(onlyTextMessage, manage_admins_buttons);
            }
        }
    }

    async getAdminFullName(ctx, next) {
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
                    ctx.reply(adminRegistrated, admin_start_buttons);
                } else {
                    ctx.session.stateData = undefined;
                    ctx.reply(duplicateAdmin, admin_start_buttons);
                }
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, manage_admins_buttons);
            }
        }
    }

    async removeAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adminUserName = inputUserName.split("@")[1];
                const admin = await AdminModel.findOne({userName: adminUserName});
                if (admin) {
                    await AdminModel.findOneAndDelete({userName: adminUserName});
                    ctx.reply(adminRemoved, manage_admins_buttons);
                } else {
                    ctx.reply(noAdminExist, manage_admins_buttons);
                }
            } else {
                ctx.reply(onlyTextMessage, manage_admins_buttons);
            }
        }
    }


    async addAdviser(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adviserUserName = inputUserName.split("@")[1];
                if (adviserUserName) {
                    ctx.session.stateData = {...ctx.session.stateData, adviserUserName};
                    ctx.session.state = stateList.getAdviserFullName;
                    ctx.reply(enterAdviserFullname);
                } else {
                    ctx.reply(enteredUsernameIsInvalid, manage_advisers_buttons);
                }
            } else {
                ctx.reply(onlyTextMessage, manage_advisers_buttons);
            }
        }
    }

    async getAdviserFullName(ctx, next) {
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
                    ctx.reply(adviserRegistrated, admin_start_buttons);
                } else {
                    ctx.session.stateData = undefined;
                    ctx.reply(duplicateAdviser, admin_start_buttons);
                }
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, manage_advisers_buttons);
            }
        }
    }

    async removeAdviser(ctx, next) {
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
                    ctx.reply(adviserRemoved, manage_advisers_buttons);
                } else {
                    ctx.reply(noAdviserExist, manage_advisers_buttons);
                }
            } else {
                ctx.reply(onlyTextMessage, manage_advisers_buttons);
            }
        }
    }

    async promoteAdviser(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adviserUserName = inputUserName.split("@")[1];
                if (adviserUserName) {
                    const adviser = await AdviserModel.findOne({userName: adviserUserName})
                    if (adviser) {
                        const adviser = await AdviserModel.findOneAndUpdate({userName: adviserUserName}, {
                            isPro: true
                        }, {new: true})
                        await adviser.save()
                        ctx.reply("مشاور مورد نظر ارتقای رتبه پیدا کرد", manage_advisers_buttons)
                    } else {
                        ctx.reply("مشاوری با این یوزرنیم یافت نشد.", manage_advisers_buttons)
                    }
                } else {
                    ctx.reply(enteredUsernameIsInvalid, manage_advisers_buttons);
                }
            } else {
                ctx.reply(onlyTextMessage, manage_advisers_buttons);
            }
        }
    }

    async demoteAdviser(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const inputUserName = ctx.message.text;
                const adviserUserName = inputUserName.split("@")[1];
                if (adviserUserName) {
                    const adviser = await AdviserModel.findOne({userName: adviserUserName})
                    if (adviser) {
                        const adviser = await AdviserModel.findOneAndUpdate({userName: adviserUserName}, {
                            isPro: false
                        }, {new: true})
                        await adviser.save()
                        ctx.reply("مشاور مورد نظر تنزل رتبه پیدا کرد", manage_advisers_buttons)
                    } else {
                        ctx.reply("مشاوری با این یوزرنیم یافت نشد.", manage_advisers_buttons)
                    }
                } else {
                    ctx.reply(enteredUsernameIsInvalid, manage_advisers_buttons);
                }
            } else {
                ctx.reply(onlyTextMessage, manage_advisers_buttons);
            }
        }
    }

    async getPlanTitle(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planTitle = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    planTitle,
                };
                ctx.session.state = stateList.getPlanPrice;
                ctx.reply(
                    "لطفا قیمت طرح را طرح وارد نمایید (به تومان) ",
                    cancel_button
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, manage_plans_buttons);
            }
        }
    }

    async getPlanPrice(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planPrice = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    planPrice,
                };
                ctx.session.state = stateList.getPlanDescription;
                ctx.reply(
                    "لطفا توضیحاتی را در مورد طرح وارد نمایید",
                    cancel_button
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, manage_plans_buttons);
            }
        }
    }

    async getPlanDescription(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planDescription = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    planDescription,
                };
                ctx.session.state = stateList.getPlanImage;
                ctx.reply(
                    `لطفا تصویری را در مورد طرح وارد نمایید
        در صورتی که مایل نیستید تصویری را برای طرح بارگذاری کنید بر روی دکمه ی "گذشتن از این مرحله" کلیک کنید`,
                    skip_from_this_step_buttons
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, manage_plans_buttons);
            }
        }
    }

    async getPlanImage(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.photo) {
                const planImage = ctx.message.photo[0].file_id;
                ctx.session.stateData = {...ctx.session.stateData, planImage};
                ctx.session.state = stateList.registerPlan;
                await ctx.replyWithPhoto(planImage, {
                    caption: planCaption(ctx.session.stateData),
                });
                ctx.reply(
                    "لطفا یکی از موارد زیر را انتخاب نمایید",
                    accept_discard_buttons
                );
            } else if (ctx.message.text === all_buttons_text.skip_from_this_step) {
                const planImage =
                    "AgACAgQAAxkBAAIKw2II7CYViBRcubDrLJ2Tn9WTB0CcAAKMtzEbwGZJUAIyce3UUnJfAQADAgADeQADIwQ";
                ctx.session.stateData = {...ctx.session.stateData, planImage};
                ctx.session.state = stateList.registerPlan;
                await ctx.replyWithPhoto(planImage, {
                    caption: planCaption(ctx.session.stateData),
                });
                ctx.reply(
                    "لطفا یکی از موارد زیر را انتخاب نمایید",
                    accept_discard_buttons
                );
            }
        }
    }

    async registerPlan(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.accept) {
            const plan = await PlanModel.findOne({planTitle: ctx.session.stateData.planTitle})
            if (!plan) {
                const newPlan = await new PlanModel({
                    planTitle: ctx.session.stateData.planTitle,
                    planPrice: ctx.session.stateData.planPrice,
                    planDescription: ctx.session.stateData.planDescription,
                    planImage: ctx.session.stateData.planImage,
                });
                await newPlan.save();
                ctx.session.stateData = undefined;
                ctx.reply("طرح با موفقیت ثبت شد", admin_start_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply("طرحی با این عنوان در حال حاضر وجود دارد.", admin_start_buttons);
            }
        } else if (ctx.message.text === all_buttons_text.discard) {
            ctx.session.stateData = undefined;
            ctx.reply("طرح با موفقیت لغو شد", admin_start_buttons);
        } else {
            ctx.session.stateData = undefined;
            ctx.reply(
                "خطایی صورت گرفته است لطفا مجددا امتحان کنید",
                admin_start_buttons
            );
        }
    }

    async sendMessageForAdvisers(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const advisers = await AdviserModel.find();
            if (advisers.length !== 0) {
                await advisers.forEach(adviser => {
                    ctx.telegram.forwardMessage(adviser.userChatId, ctx.chat.id, ctx.message.message_id)
                })
                ctx.reply("پیام شما برای مشاوران ارسال گردید.", admin_start_buttons)
            } else {
                ctx.reply("مشاوری یافت نشد.", admin_start_buttons)
            }
        }
    }

    async sendMessageForAllUsers(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const users = await UserModel.find();
            if (users.length !== 0) {
                await users.forEach(user => {
                    ctx.telegram.forwardMessage(
                        user.userChatId,
                        ctx.chat.id,
                        ctx.message.message_id
                    );
                })
                ctx.reply("پیام شما برای همه ی کاربران ارسال شد.", admin_start_buttons);
            } else {
                ctx.reply("کاربری یافت نشد.", admin_start_buttons);
            }
        }
    }

    async sendMessageForRegStudents(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            await ctx.telegram.forwardMessage(
                ctx.session.stateData.userChatId,
                ctx.chat.id,
                ctx.message.message_id
            );
            ctx.session.stateData = undefined;
            ctx.reply("پیام شما با موفقیت ارسال شد.", admin_start_buttons);
        } else {
            ctx.session.stateData = undefined;
            ctx.reply("لطفا یکی از موارد زیر را انتخاب نمایید", admin_start_buttons);
        }
    }


    async getProStudentFullNameFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.session.status === "update") {
                    if (ctx.message.text !== all_buttons_text.dont_change) {
                        const proStudentFullName = await ctx.message.text;
                        ctx.session.stateData = {
                            ...ctx.session.stateData,
                            proStudentFullName,
                        };
                        ctx.session.state = stateList.getProStudentUserNameFromAdmin;
                        ctx.reply(
                            `لطفا یوزر نیم دانش آموز را به فرم @nemoone وارد نمایید :  `,
                            dont_change
                        );
                    } else {
                        const proStudentFullName = ctx.session.student.userFullName
                        ctx.session.stateData = {
                            ...ctx.session.stateData,
                            proStudentFullName,
                        };
                        ctx.session.state = stateList.getProStudentUserNameFromAdmin;
                        ctx.reply(
                            `لطفا یوزر نیم دانش آموز را به فرم @nemoone وارد نمایید :  `,
                            dont_change)
                    }
                } else {
                    const proStudentFullName = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentFullName,
                    };
                    ctx.session.state = stateList.getProStudentUserNameFromAdmin;
                    ctx.reply(
                        `لطفا یوزر نیم دانش آموز را به فرم @nemoone وارد نمایید :  `,
                        cancel_button
                    );
                }
            } else {
                ctx.session = undefined
                ctx.reply(onlyTextMessage, manage_pro_students_buttons);
            }
        } else {
            ctx.session = undefined
        }
    }

    async getProStudentUserNameFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                if (ctx.session.status === "update") {
                    if (ctx.message.text !== all_buttons_text.dont_change) {
                        const proStudentUserName = await ctx.message.text.split("@")[1];
                        if (proStudentUserName) {
                            ctx.session.stateData = {
                                ...ctx.session.stateData,
                                proStudentUserName,
                            }
                            ctx.session.state = stateList.getProStudentFieldFromAdmin;
                            ctx.reply(
                                "لطفا رشته ی تحصیلی دانش آموز را وارد کنید : ",
                                enter_field_buttons
                            );
                        } else {
                            ctx.reply("فرم یوزر نیم وارد شده صحیح نمیباشد.", manage_pro_students_buttons)
                            ctx.session = undefined
                        }
                    } else {
                        const proStudentUserName = ctx.session.student.userName
                        ctx.session.stateData = {
                            ...ctx.session.stateData,
                            proStudentUserName,
                        }
                        ctx.session.state = stateList.getProStudentFieldFromAdmin;
                        ctx.reply(
                            "لطفا رشته ی تحصیلی دانش آموز را وارد کنید : ",
                            enter_field_buttons
                        );
                    }
                } else {
                    const proStudentUserName = await ctx.message.text.split("@")[1];
                    console.log(proStudentUserName)
                    if (proStudentUserName) {
                        ctx.session.stateData = {
                            ...ctx.session.stateData,
                            proStudentUserName,
                        }
                        ctx.session.state = stateList.getProStudentFieldFromAdmin;
                        ctx.reply(
                            "لطفا رشته ی تحصیلی دانش آموز را وارد کنید : ",
                            enter_field_buttons
                        );
                    } else {
                        ctx.reply("فرم یوزر نیم وارد شده صحیح نمیباشد.", manage_pro_students_buttons)
                    }
                }
            } else {
                ctx.session = undefined
                ctx.reply(onlyTextMessage, manage_pro_students_buttons);
            }
        } else {
            ctx.session = undefined
        }
    }

    async getProStudentFieldFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi ||
                ctx.message.text === all_buttons_text.tajrobi ||
                ctx.message.text === all_buttons_text.ensani ||
                ctx.message.text === all_buttons_text.honar ||
                ctx.message.text === all_buttons_text.zaban ||
                ctx.message.text === all_buttons_text.other_fields) {
                const proStudentField = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentField,
                };
                ctx.session.state = stateList.getProStudentGradeFromAdmin;
                ctx.reply(
                    "لطفا پایه تحصیلی دانش آموز را وارد کنید : ",
                    enter_grade_buttons
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply("ورودی نامعتبر است", manage_pro_students_buttons);
            }
        }
    }

    async getProStudentGradeFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth ||
                ctx.message.text === all_buttons_text.eleventh ||
                ctx.message.text === all_buttons_text.twelfth) {
                const proStudentGrade = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentGrade,
                };
                ctx.session.state = stateList.getProStudentLevelFromAdmin;
                ctx.reply(
                    "لطفا سطح دانش آموز را تعیین کنید : ",
                    enter_level_buttons
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply("ورودی نامعتبر است.", manage_pro_students_buttons);
            }
        }
    }

    async getProStudentLevelFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.level_A ||
                ctx.message.text === all_buttons_text.level_B ||
                ctx.message.text === all_buttons_text.level_C ||
                ctx.message.text === all_buttons_text.level_D
            ) {
                const proStudentLevel = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentLevel,
                };
                ctx.session.state = stateList.getProStudentPhoneNumberFromAdmin;
                if (ctx.session.status === "update")
                    return ctx.reply(
                        "لطفا شماره ی تماس دانش آموز را وارد کنید : ",
                        dont_change
                    );
                ctx.reply(
                    "لطفا شماره ی تماس دانش آموز را وارد کنید : ",
                    skip_from_this_step_buttons
                );
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(onlyTextMessage, manage_pro_students_buttons);
            }
        }
    }

    async getProStudentPhoneNumberFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentPhoneNumber = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentPhoneNumber,
                    };
                    ctx.session.state = stateList.getProStudentWhatsUpNumberFromAdmin;
                    ctx.reply(
                        "لطفا شماره ی واتس آپ دانش آموز را وارد کنید : ",
                        dont_change)
                } else {
                    const proStudentPhoneNumber = ctx.session.student.userPhoneNumber;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentPhoneNumber,
                    };
                    ctx.session.state = stateList.getProStudentWhatsUpNumberFromAdmin;
                    ctx.reply(
                        "لطفا شماره ی واتس آپ دانش آموز را وارد کنید : ",
                        dont_change)
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentPhoneNumber = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentPhoneNumber,
                };
                ctx.session.state = stateList.getProStudentWhatsUpNumberFromAdmin;
                ctx.reply(
                    "لطفا شماره ی واتس آپ دانش آموز را وارد کنید : ",
                    skip_from_this_step_buttons)
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentPhoneNumber = "فاقد شماره ی تماس";
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentPhoneNumber,
                };
                ctx.session.state = stateList.getProStudentWhatsUpNumberFromAdmin;
                ctx.reply(
                    "لطفا شماره ی واتس آپ دانش آموز را وارد کنید : ",
                    skip_from_this_step_buttons)
            } else {
                ctx.reply(onlyTextMessage, manage_pro_students_buttons)
                ctx.session = undefined
            }
        } else {
            ctx.session = undefined
        }
    }


    async getProStudentWhatsUpNumberFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentWhatsUpNumber = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentWhatsUpNumber,
                    };
                    ctx.session.state = stateList.getProStudentEmailFromAdmin;
                    ctx.reply(
                        "لطفا ایمیل دانش آموز را وارد کنید : ",
                        dont_change)
                } else {
                    const proStudentWhatsUpNumber = ctx.session.student.userWhatsUpNumber;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentWhatsUpNumber,
                    };
                    ctx.session.state = stateList.getProStudentEmailFromAdmin;
                    ctx.reply(
                        "لطفا ایمیل دانش آموز را وارد کنید : ",
                        dont_change)
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentWhatsUpNumber = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentWhatsUpNumber,
                };
                ctx.session.state = stateList.getProStudentEmailFromAdmin;
                ctx.reply(
                    "لطفا ایمیل دانش آموز را وارد کنید : ",
                    skip_from_this_step_buttons)
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentWhatsUpNumber = "فاقد شماره ی تماس";
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentWhatsUpNumber,
                };
                ctx.session.state = stateList.getProStudentEmailFromAdmin;
                ctx.reply(
                    "لطفا شماره ی واتس آپ دانش آموز را وارد کنید : ",
                    skip_from_this_step_buttons)
            } else {
                ctx.reply(onlyTextMessage, manage_pro_students_buttons)
                ctx.session = undefined
            }
        } else {
            ctx.session = undefined
        }
    }

    async getProStudentEmailFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentEmail = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentEmail,
                    };
                    ctx.session.state = stateList.getProStudentCityFromAdmin;
                    ctx.reply(
                        "لطفا شهر دانش آموز را وارد کنید : ",
                        dont_change)
                } else {
                    const proStudentEmail = ctx.session.student.userEmail;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentEmail,
                    };
                    ctx.session.state = stateList.getProStudentCityFromAdmin;
                    ctx.reply(
                        "لطفا شهر دانش آموز را وارد کنید : ",
                        dont_change)
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentEmail = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentEmail,
                };
                ctx.session.state = stateList.getProStudentCityFromAdmin;
                ctx.reply(
                    "لطفا شهر دانش آموز را وارد کنید : ",
                    skip_from_this_step_buttons)
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentEmail = "فاقد شماره ی تماس";
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentEmail,
                };
                ctx.session.state = stateList.getProStudentCityFromAdmin;
                ctx.reply(
                    "لطفا شهر دانش آموز را وارد کنید : ",
                    skip_from_this_step_buttons)
            } else {
                ctx.reply(onlyTextMessage, manage_pro_students_buttons)
                ctx.session = undefined
            }
        } else {
            ctx.session = undefined
        }
    }

    async getProStudentCityFromAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text && ctx.session.status === "update") {
                if (ctx.message.text !== all_buttons_text.dont_change) {
                    const proStudentCity = await ctx.message.text;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentCity,
                    };
                    ctx.session.state = stateList.registerProStudentByAdmin;
                    ctx.reply(
                        await pro_student_preview(ctx.session.stateData),
                        accept_discard_buttons
                    );
                } else {
                    const proStudentCity = await ctx.session.student.userCity;
                    ctx.session.stateData = {
                        ...ctx.session.stateData,
                        proStudentCity,
                    };
                    ctx.session.state = stateList.registerProStudentByAdmin;
                    ctx.reply(
                        await pro_student_preview(ctx.session.stateData),
                        accept_discard_buttons
                    );
                }
            } else if (ctx.message.text && ctx.message.text !== all_buttons_text.skip_from_this_step) {
                const proStudentCity = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentCity,
                };
                ctx.session.state = stateList.registerProStudentByAdmin;
                ctx.reply(
                    await pro_student_preview(ctx.session.stateData),
                    accept_discard_buttons
                );
            } else if (ctx.message.text && ctx.message.text === all_buttons_text.skip_from_this_step) {
                const proStudentCity = "فاقد نام شهر"
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    proStudentCity,
                };
                ctx.session.state = stateList.registerProStudentByAdmin;
                ctx.reply(
                    await pro_student_preview(ctx.session.stateData),
                    accept_discard_buttons
                );
            } else {
                ctx.reply(onlyTextMessage, manage_pro_students_buttons)
                ctx.session = undefined
            }
        } else {
            ctx.session = undefined
        }
    }

    async registerProStudentByAdmin(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.session.status === "update" && ctx.message.text === all_buttons_text.accept) {
            const student = await ProStudentModel.findById(ctx.session.student._id.toString())
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
                }, {new: true})
                await student.save()
                ctx.session = undefined
                return ctx.reply("اطلاعات با موفقیت بروزرسانی شد", manage_pro_students_buttons)
            } else {
                ctx.session = undefined
                return ctx.reply("خطا در بروزرسانی اطلاعات", manage_pro_students_buttons)
            }
        } else if (ctx.session.status === "update" && ctx.message.text === all_buttons_text.discard) {
            ctx.session = undefined
            return ctx.reply("بروزرسانی اطلاعت لغو شد.", manage_pro_students_buttons)
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
            await newProStudent.save()
            ctx.reply("دانش آموز با موفقیت ثبت شد", admin_start_buttons)
        } else if (ctx.session.status !== "update" && ctx.message.text === all_buttons_text.discard) {
            ctx.session.stateData = undefined;
            ctx.reply(" ثبت نام دانش آموز با موفقیت لغو شد", manage_pro_students_buttons);
        } else {
            ctx.session.stateData = undefined;
            ctx.reply(onlyTextMessage, manage_pro_students_buttons);
        }
    }

    async acceptAdviser(ctx, next) {
        ctx.session.state = undefined
        if (ctx.message.text === all_buttons_text.yes) {
            let regAdviser = await AdviserModel.findById(ctx.session.regAdviserId)
            if (regAdviser) {
                regAdviser = await AdviserModel.findByIdAndUpdate(ctx.session.regAdviserId, {
                    isAccepted: true
                }, {new: true})
                await regAdviser.save()
                ctx.reply("مشاور مورد نظر با موفقیت پذیرفته شد.", admin_start_buttons)
                ctx.session = undefined
            } else {
                ctx.reply("مشاور مورد نظر یافت نشد.", admin_start_buttons)
                ctx.session = undefined
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply("درخواست شما لغو شد.", admin_start_buttons)
            ctx.session = undefined
        } else {
            ctx.reply("ورودی نامعتبر میباشد.", admin_start_buttons)
            ctx.session = undefined
        }
    }

    async acceptStudent(ctx, next) {
        ctx.session.state = undefined
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.studentId)
            if (student) {
                student = await ProStudentModel.findByIdAndUpdate(ctx.session.studentId, {
                    isPro: true
                }, {new: true})
                await student.save()
                ctx.reply("دانش آموز مورد نظر تبدیل به دانش آموز ویژه گردید.", admin_start_buttons)
                await ctx.telegram.sendMessage(
                    student.userChatId,
                    `ثبت نام شما تایید شد از این پس میتوانید از خدمات ویژه ی ما استفاده کنید برای استفاده از این خدمات باید مجددا بات را /start کنید`
                );
                ctx.session = undefined
            } else {
                ctx.reply("این دانش آموز قبلا حذف شده است.", admin_start_buttons)
                ctx.session = undefined
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply("درخواست شما لغو شد.", admin_start_buttons)
            ctx.session = undefined
        } else {
            ctx.reply("ورودی نامعتبر میباشد.", admin_start_buttons)
            ctx.session = undefined
        }
    }

    async rejectAdviser(ctx, next) {
        ctx.session.state = undefined
        if (ctx.message.text === all_buttons_text.yes) {
            let regAdviser = await AdviserModel.findById(ctx.session.regAdviserId)
            if (regAdviser) {
                await AdviserModel.findByIdAndDelete(ctx.session.regAdviserId)
                ctx.reply("مشاور مورد نظر پذیرفته نشد", admin_start_buttons)
                ctx.session = undefined
            } else {
                ctx.reply("این مشاور قبلا حذف شده است.", admin_start_buttons)
                ctx.session = undefined
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply("درخواست شما لغو شد.", admin_start_buttons)
            ctx.session = undefined
        } else {
            ctx.reply("ورودی نامعتبر میباشد.", admin_start_buttons)
            ctx.session = undefined
        }
    }

    async rejectStudent(ctx, next) {
        ctx.session.state = undefined
        if (ctx.message.text === all_buttons_text.yes) {
            let student = await ProStudentModel.findById(ctx.session.studentId)
            if (student) {
                await ProStudentModel.findByIdAndDelete(ctx.session.studentId)
                ctx.reply("دانش آموز مورد نظر پذیرفته نشد", admin_start_buttons)
                ctx.session = undefined
                await ctx.telegram.sendMessage(
                    student.userChatId,
                    `ثبت نام شما انجام نشد لطفا برای پیگیری با ادمین تماس بگیرید`
                );
            } else {
                ctx.reply("این دانش آموز قبلا حذف شده است.", admin_start_buttons)
                ctx.session = undefined
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply("درخواست شما لغو شد.", admin_start_buttons)
            ctx.session = undefined
        } else {
            ctx.reply("ورودی نامعتبر میباشد.", admin_start_buttons)
            ctx.session = undefined
        }
    }

    async removeStudent(ctx, next) {
        ctx.session.state = undefined
        if (ctx.message.text === all_buttons_text.yes) {
            let proStudent = await ProStudentModel.findById(ctx.session.studentId)
            if (proStudent) {
                await ProStudentModel.findByIdAndDelete(ctx.session.studentId)
                ctx.reply("دانش آموز مورد نظر با موفقیت حذف شد", manage_pro_students_buttons)
                ctx.session = undefined
            } else {
                ctx.reply("این دانش آموز قبلا حذف شده است.", manage_pro_students_buttons)
                ctx.session = undefined
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply("درخواست شما لغو شد.", manage_pro_students_buttons)
            ctx.session = undefined
        } else {
            ctx.reply("ورودی نامعتبر میباشد.", manage_pro_students_buttons)
            ctx.session = undefined
        }
    }

    async removePlan(ctx, next) {
        ctx.session.state = undefined
        if (ctx.message.text === all_buttons_text.yes) {
            let plan = await PlanModel.findById(ctx.session.planId)
            if (plan) {
                await PlanModel.findByIdAndDelete(ctx.session.planId)
                ctx.reply("طرح مورد نظر با موفقیت حذف شد", manage_plans_buttons)
                ctx.session = undefined
            } else {
                ctx.reply("این طرح قبلا حذف شده است.", manage_plans_buttons)
                ctx.session = undefined
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply("درخواست شما لغو شد.", manage_plans_buttons)
            ctx.session = undefined
        } else {
            ctx.reply("ورودی نامعتبر میباشد.", manage_plans_buttons)
            ctx.session = undefined
        }
    }
})
();
