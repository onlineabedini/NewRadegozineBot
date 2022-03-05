const PlanModel = require("../../models/Plan");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {manage_plans_buttons} = require("../../buttons/admin_buttons/manage_plans_buttons");
const {update_and_remove_plan_buttons} = require("../../buttons/admin_buttons/update_remove_plan_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {select_an_item_message} = require("../../messages/similar_messages");
const {plan_caption, no_plan_registered_message, enter_plan_title_message} = require("../../messages/admin_messages");

module.exports = {
    [all_buttons_text.manage_plans]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply(select_an_item_message, manage_plans_buttons);
    },
    [all_buttons_text.add_plan]: async (ctx) => {
        ctx.session.state = state_list.get_plan_title;
        await ctx.reply(enter_plan_title_message, cancel_button);
    },
    [all_buttons_text.show_update_remove_plans]: async (ctx) => {
        ctx.session.state = undefined;
        const plans = await PlanModel.find();
        if (plans.length !== 0) {
            plans.forEach((plan) => {
                ctx.replyWithPhoto(plan.image, {
                    caption: plan_caption(plan), reply_markup: update_and_remove_plan_buttons(plan._id),
                });
            });
        } else {
            ctx.reply(no_plan_registered_message, manage_plans_buttons);
        }
    }
}