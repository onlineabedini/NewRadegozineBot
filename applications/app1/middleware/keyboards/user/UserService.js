const PlanModel = require("../../../models/Plan");
//import stateList
const stateList = require("../../stateList");

//import messages
const {
    asking_question_guide, pro_students_register_message,
} = require("../../../messages/studentMessages");
const {please_enter_the_requested_information_message , enter_full_name_message} = require("../../../messages/similarMessages");
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {register_buttons} = require("../../../buttons/user_buttons/register_buttons");
const {plans_buttons} = require("../../../buttons/similar_buttons/plans_buttons");
const {select_an_item_message} = require("../../../messages/similarMessages");
const {no_plan_found_message} = require("../../../messages/adminMessages");

module.exports = new (class UserService {

    async ask_question(ctx, next) {
        ctx.session.state = stateList.getStudentFullName;
        await ctx.reply(asking_question_guide);
        await ctx.reply(enter_full_name_message, cancel_button);
    }

    async register(ctx, next) {
        ctx.reply(select_an_item_message, register_buttons);
    }

    async register_as_pro_students(ctx, next) {
        ctx.session = undefined
        const plansData = await PlanModel.find();
        if (plansData.length !== 0) {
            const tempMessage = await ctx.reply(pro_students_register_message, plans_buttons(plansData));
            ctx.session.chatId = tempMessage.chat.id;
            ctx.session.messageId = tempMessage.message_id;
        } else ctx.reply(no_plan_found_message);
    }

    async register_as_adviser(ctx, next) {
        ctx.session = undefined
        await ctx.reply(please_enter_the_requested_information_message);
        ctx.session.state = stateList.getAdviserFullNameForRegister;
        ctx.reply(enter_full_name_message, cancel_button);
    }
})();
