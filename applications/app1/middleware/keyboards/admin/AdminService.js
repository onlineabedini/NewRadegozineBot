//import models
const AdminModel = require("../../../models/Admin");
const AdviserModel = require("../../../models/Adviser");
const ProStudentModel = require("../../../models/ProStudent");
const PlanModel = require("../../../models/Plan");

//import stateList
const stateList = require("../../stateList");

//import messages
const {
    enter_new_admin_username_message,
    enter_admin_username_for_remove_message,

    enter_new_adviser_username_message,
    enter_adviser_username_for_remove_message,

    show_advisers_questions_list_message,
    reg_adviser_info_message,
    advisers_list_message,
    admins_list_message,
    admins_list_title_message,
    no_admin_found_message,
    advisers_list_title_message,
    no_adviser_added_message,
    no_adviser_found_message,
    reg_advisers_list_title_message,
    no_one_has_registered_recently,
    promote_adviser_message,
    demote_adviser_message,
    no_student_found_message,
    pro_student_caption,
    select_your_plan_message,
    no_plan_registered_message,
    enter_plan_title_message,
    no_plan_found_message,
} = require("../../../messages/adminMessages");

const {
    select_an_item_message, enter_your_message, empty_list_message,
} = require("../../../messages/similarMessages");


const {plan_caption} = require("../../../messages/adminMessages");
const {manage_admins_buttons} = require("../../../buttons/admin_buttons/manage_admins_buttons");
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {manage_advisers_buttons} = require("../../../buttons/admin_buttons/manage_advisers_buttons");
const {manage_plans_buttons} = require("../../../buttons/admin_buttons/manage_plans_buttons");
const {manage_pro_students_buttons} = require("../../../buttons/admin_buttons/manage_pro_students_buttons");
const {update_remove_student_buttons} = require("../../../buttons/admin_buttons/update_remove_student_buttons");
const {plans_buttons} = require("../../../buttons/similar_buttons/plans_buttons");
const {update_and_remove_plan_buttons} = require("../../../buttons/admin_buttons/update_remove_plan_buttons");
const {reg_adviser_register_buttons} = require("../../../buttons/admin_buttons/reg_adviser_register_buttons");


//define AdminService class
// create an instance
module.exports = new (class AdminService {

    async manage_admins(ctx, next) {
        ctx.session.state = undefined;
        ctx.reply(select_an_item_message, manage_admins_buttons);
    }

    //! this section will refactor
    async show_admins_list(ctx, next) {
        ctx.session.state = undefined;
        const admins = await AdminModel.find();
        if (admins.length !== 0) {
            await ctx.reply(admins_list_title_message)
            ctx.reply(admins_list_message(admins))
        } else {
            ctx.reply(no_admin_found_message, manage_admins_buttons)
        }
    }

    async add_admin(ctx, next) {
        ctx.session.state = stateList.addAdmin;
        await ctx.reply(enter_new_admin_username_message, cancel_button);
    }

    async remove_admin(ctx, next) {
        ctx.session.state = stateList.removeAdmin;
        await ctx.reply(enter_admin_username_for_remove_message, cancel_button);
    }

    async manage_advisers(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, manage_advisers_buttons);
    }

    // This section will refactor
    async show_advisers_list(ctx, next) {
        ctx.session.state = undefined;
        const advisers = await AdviserModel.find({isAccepted: true});
        if (advisers.length !== 0) {
            await ctx.reply(advisers_list_title_message)
            ctx.reply(advisers_list_message(advisers))
        } else {
            ctx.reply(no_adviser_found_message, manage_advisers_buttons)
        }
    }

    async show_reg_advisers_list(ctx, next) {
        ctx.session.state = undefined;
        const regAdvisers = await AdviserModel.find({IsRegistered: true});
        await ctx.reply(reg_advisers_list_title_message)
        if (regAdvisers.length !== 0) {
            regAdvisers.forEach(regAdviser => {
                ctx.reply(reg_adviser_info_message(regAdviser), reg_adviser_register_buttons(regAdviser._id))
            })
        } else {
            ctx.reply(no_one_has_registered_recently, manage_advisers_buttons)
        }
    }

    async add_adviser(ctx, next) {
        ctx.session.state = stateList.addAdviser;
        await ctx.reply(enter_new_adviser_username_message, cancel_button);
    }

    async remove_adviser(ctx, next) {
        ctx.session.state = stateList.removeAdviser;
        await ctx.reply(enter_adviser_username_for_remove_message, cancel_button);
    }

    async promote_adviser(ctx, next) {
        ctx.session.state = stateList.promoteAdviser;
        await ctx.reply(promote_adviser_message, cancel_button);
    }

    async demote_adviser(ctx, next) {
        ctx.session.state = stateList.demoteAdviser;
        await ctx.reply(demote_adviser_message, cancel_button);
    }

    async manage_plans(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, manage_plans_buttons);
    }

    async manage_pro_students(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, manage_pro_students_buttons);
    }

    async show_update_remove_students(ctx, next) {
        ctx.session.state = undefined;
        const students = await ProStudentModel.find();
        if (students.length !== 0) {
            students.forEach(async (student) => {
                ctx.reply(await pro_student_caption(student), update_remove_student_buttons(student._id))
            })
        } else {
            await ctx.reply(no_student_found_message, manage_pro_students_buttons);
        }
    }

    async add_student(ctx, next) {
        ctx.session = undefined
        const plans = await PlanModel.find();
        if (plans.length !== 0) {
            const tempMessage = await ctx.reply(select_your_plan_message, plans_buttons(plans));
            ctx.session.chatId = tempMessage.chat.id;
            ctx.session.messageId = tempMessage.message_id;
        } else await ctx.reply(no_plan_found_message, manage_pro_students_buttons);
    }

    async show_update_remove_plans(ctx, next) {
        ctx.session.state = undefined;
        const plans = await PlanModel.find();
        if (plans.length !== 0) {
            plans.forEach((plan) => {
                ctx.replyWithPhoto(plan.planImage, {
                    caption: plan_caption(plan), reply_markup: update_and_remove_plan_buttons(plan._id)
                });
            });
        } else {
            ctx.reply(no_plan_registered_message, manage_plans_buttons);
        }
    }

    async add_plan(ctx, next) {
        ctx.session.state = stateList.getPlanTitle;
        await ctx.reply(enter_plan_title_message, cancel_button);
    }

    async send_message_for_advisers(ctx, next) {
        ctx.session.state = stateList.sendMessageForAdvisers;
        await ctx.reply(enter_your_message, cancel_button);
    }


    async send_message_for_users(ctx, next) {
        ctx.session.state = stateList.sendMessageForAllUsers;
        await ctx.reply(enter_your_message, cancel_button);
    }

    async show_advisers_questions_list(ctx, next) {
        ctx.session.state = undefined;

        const advisersData = await AdviserModel.find();
        const advisersIds = advisersData.map((adviser) => adviser.id);

        if (advisersIds.length !== 0) {
            await ctx.reply(show_advisers_questions_list_message);
            for (const item in advisersIds) {
                let adviser = await AdviserModel.findOne({_id: advisersIds[item]});
                let messagesIds = adviser.messagesIds;
                if (messagesIds.length !== 0) {
                    for (const item in messagesIds) {
                        await ctx.telegram.forwardMessage(ctx.message.chat.id, adviser.userChatId, messagesIds[item]);
                    }
                    return;
                }
            }
            await ctx.reply(empty_list_message);
        } else {
            await ctx.reply(empty_list_message);
        }
    }

})();
