//import models
const AdminModel = require("../../../models/Admin");
const AdviserModel = require("../../../models/Adviser");
const StudentModel = require("../../../models/Questioner");
const ProStudentModel = require("../../../models/ProStudent");
const PlanModel = require("../../../models/Plan");

//import stateList
const stateList = require("../../stateList");

//import messages
const {
    enterNewAdminUsername,
    enterRemoveAdminUsername,
    adminsListMessage,
    showAdminsList,
    noAdminExist,
    enterNewAdviserUsername,
    enterRemoveAdviserUsername,
    advisersListMessage,
    showAdvisersList,
    noAdviserExist,
    showAdvisersQuestionsList, proStudentCaption, reg_adviser_info_message, advisers_list_message, admins_list_message,
} = require("../../../messages/adminMessages");

const {
    selectAnItem,
    enterYourMessage,
    emptyList,
} = require("../../../messages/similarMessages");

const {youHaveBeenRemoved} = require("../../../messages/similarMessages");
const {planCaption} = require("../../../messages/adminMessages");
const {manage_admins_buttons} = require("../../../buttons/admin_buttons/manage_admins_buttons");
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {manage_advisers_buttons} = require("../../../buttons/admin_buttons/manage_advisers_buttons");
const {manage_plans_buttons} = require("../../../buttons/admin_buttons/manage_plans_buttons");
const {manage_pro_students_buttons} = require("../../../buttons/admin_buttons/manage_pro_students_buttons");
const {update_and_remove_student_buttons} = require("../../../buttons/admin_buttons/update_and_remove_student_buttons");
const {plans_buttons} = require("../../../buttons/similar_buttons/plans_buttons");
const {update_and_remove_plan_buttons} = require("../../../buttons/admin_buttons/update_and_remove_plan_buttons");
const {answer_buttons} = require("../../../buttons/similar_buttons/answer_buttons");
const {user_start_buttons} = require("../../../buttons/user_buttons/user_start_buttons");
const {reg_adviser_register_buttons} = require("../../../buttons/admin_buttons/reg_adviser_register_buttons");


//define AdminService class
// create an instance
module.exports = new (class AdminService {

    async manage_admins(ctx, next) {
        ctx.session.state = undefined;
        ctx.reply(selectAnItem, manage_admins_buttons);
    }

    //! this section will refactor
    async show_admins_list(ctx, next) {
        ctx.session.state = undefined;
        const admins = await AdminModel.find();
        if (admins.length !== 0) {
            await ctx.reply("لیست مدیران")
            ctx.reply(admins_list_message(admins))
        } else {
            ctx.reply("مدیری یافت نشد.", manage_admins_buttons)
        }
    }

    async add_admin(ctx, next) {
        ctx.session.state = stateList.addAdmin;
        await ctx.reply(enterNewAdminUsername, cancel_button);
    }

    async remove_admin(ctx, next) {
        ctx.session.state = stateList.removeAdmin;
        await ctx.reply(enterRemoveAdminUsername, cancel_button);
    }

    async manage_advisers(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(selectAnItem, manage_advisers_buttons);
    }

    // This section will refactor
    async show_advisers_list(ctx, next) {
        ctx.session.state = undefined;
        const advisers = await AdviserModel.find({isAccepted: true});
        if (advisers.length !== 0) {
            await ctx.reply("لیست مشاوران")
            ctx.reply(advisers_list_message(advisers))
        } else {
            ctx.reply("مشاوری یافت نشد.", manage_advisers_buttons)
        }
    }

    async show_reg_advisers_list(ctx, next) {
        ctx.session.state = undefined;
        const regAdvisers = await AdviserModel.find({IsRegistered: true});
        await ctx.reply("لیست مشاورین ثبت نامی")
        if (regAdvisers.length !== 0) {
            regAdvisers.forEach(regAdviser => {
                ctx.reply(reg_adviser_info_message(regAdviser), reg_adviser_register_buttons(regAdviser._id))
            })
        } else {
            ctx.reply("اخیرا کسی ثبت نام نکرده است.", manage_advisers_buttons)
        }
    }

    async add_adviser(ctx, next) {
        ctx.session.state = stateList.addAdviser;
        await ctx.reply(enterNewAdviserUsername, cancel_button);
    }

    async remove_adviser(ctx, next) {
        ctx.session.state = stateList.removeAdviser;
        await ctx.reply(enterRemoveAdviserUsername, cancel_button);
    }

    async promote_adviser(ctx, next) {
        ctx.session.state = stateList.promoteAdviser;
        await ctx.reply(`🔹 لطفا یوزر نیم مشاوری که قصد ارتقای درجه ی آن را دارید به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مشاور ارتقای رتبه نخواهد یافت.`, cancel_button);
    }

    async demote_adviser(ctx, next) {
        ctx.session.state = stateList.demoteAdviser;
        await ctx.reply(`🔹 لطفا یوزر نیم مشاوری که قصد تنزل درجه ی آن را دارید به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مشاور تنزل رتبه نخواهد یافت.`, cancel_button);
    }

    async manage_plans(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(selectAnItem, manage_plans_buttons);
    }

    async manage_pro_students(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(selectAnItem, manage_pro_students_buttons);
    }

    async showlist_update_remove_students(ctx, next) {
        ctx.session.state = undefined;
        const students = await ProStudentModel.find();
        if (students.length !== 0) {
            students.forEach(async (student) => {
                ctx.reply(await proStudentCaption(student), update_and_remove_student_buttons(student._id))
            })
        } else {
            await ctx.reply("دانش آموزی یافت نشد.", manage_pro_students_buttons);
        }
    }

    async add_student(ctx, next) {
        ctx.session = undefined
        const plans = await PlanModel.find();
        if (plans.length !== 0) {
            await ctx.reply("لطفا طرح مورد نظر خود را وارد کنید : ", plans_buttons(plans));
        } else await ctx.reply("هیچ طرحی برای ثبت نام یافت نشد", manage_pro_students_buttons);
    }

    async showlist_update_remove_plans(ctx, next) {
        ctx.session.state = undefined;
        const plans = await PlanModel.find();
        if (plans.length !== 0) {
            plans.forEach((plan) => {
                ctx.replyWithPhoto(plan.planImage, {
                    caption: planCaption(plan),
                    reply_markup: update_and_remove_plan_buttons(plan._id)
                });
            });
        } else {
            ctx.reply("هیچ طرحی ثبت نشده است");
        }
    }

    async add_plan(ctx, next) {
        ctx.session.state = stateList.getPlanTitle;
        await ctx.reply("لطفا عنوان طرح را وارد نمایید", cancel_button);
    }

    async send_message_for_advisers(ctx, next) {
        ctx.session.state = stateList.sendMessageForAdvisers;
        await ctx.reply(enterYourMessage, cancel_button);
    }


    async send_message_for_users(ctx, next) {
        ctx.session.state = stateList.sendMessageForAllUsers;
        await ctx.reply(enterYourMessage, cancel_button);
    }

    async show_advisers_questions_list(ctx, next) {
        ctx.session.state = undefined;

        const advisersData = await AdviserModel.find();
        const advisersIds = advisersData.map((adviser) => adviser.id);

        if (advisersIds.length !== 0) {
            await ctx.reply(showAdvisersQuestionsList);
            for (const item in advisersIds) {
                let adviser = await AdviserModel.findOne({_id: advisersIds[item]});
                let messagesIds = adviser.messagesIds;
                if (messagesIds.length !== 0) {
                    for (const item in messagesIds) {
                        await ctx.telegram.forwardMessage(
                            ctx.message.chat.id,
                            adviser.userChatId,
                            messagesIds[item]
                        );
                    }
                    return;
                }
            }
            await ctx.reply(emptyList);
        } else {
            await ctx.reply(emptyList);
        }
    }

})();
