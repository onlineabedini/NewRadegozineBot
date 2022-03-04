const PlanModel = require("../../models/Plan");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {register_buttons} = require("../../buttons/user_buttons/register_buttons");
const {plans_buttons} = require("../../buttons/similar_buttons/plans_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {
    select_an_item_message,
    please_enter_the_requested_information_message,
    enter_full_name_message,
} = require("../../messages/similar_messages");
const {pro_students_register_message} = require("../../messages/student_messages");
const {no_plan_found_message} = require("../../messages/admin_messages");


module.exports = {
    [all_buttons_text.register]: async (ctx) => {
        ctx.reply(select_an_item_message, register_buttons);
    },
    [all_buttons_text.register_as_pro_students]: async (ctx) => {
        ctx.session = undefined;
        const plans = await PlanModel.find();
        if (plans.length !== 0) {
            const temp_message = await ctx.reply(pro_students_register_message, plans_buttons(plans));
            ctx.session.chat_id = temp_message.chat.id;
            ctx.session.message_id = temp_message.message_id;
        } else ctx.reply(no_plan_found_message);
    },
    [all_buttons_text.register_as_adviser]: async (ctx) => {
        ctx.session = undefined;
        await ctx.reply(please_enter_the_requested_information_message);
        ctx.session.state = state_list.get_adviser_fullname_for_register;
        ctx.reply(enter_full_name_message, cancel_button);
    },
}