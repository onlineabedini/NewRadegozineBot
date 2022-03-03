const stateList = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const PlanModel = require("../../models/Plan");
const {
    the_plan_was_removed_message,
    this_plan_has_already_been_removed_message,
    enter_plan_price_message,
    enter_plan_description_message,
    enter_plan_image_message,
    plan_caption,
    plan_registered_message,
    duplicate_plan_message,
    adding_plan_was_canceled
} = require("../../messages/admin_messages");
const {manage_plans_buttons} = require("../../buttons/admin_buttons/manage_plans_buttons");
const {
    your_request_has_been_canceled,
    input_is_invalid_message,
    text_message_only,
    select_an_item_message,
    something_went_wrong
} = require("../../messages/similar_messages");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {skip_from_this_step_buttons} = require("../../buttons/similar_buttons/skip_from_this_step");
const {accept_discard_buttons} = require("../../buttons/similar_buttons/accept_discard_buttons");
const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");
module.exports = {
    [stateList.get_plan_title]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planTitle = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, planTitle,
                };
                ctx.session.state = stateList.get_plan_price;
                ctx.reply(enter_plan_price_message, cancel_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_plans_buttons);
            }
        }
    }, [stateList.get_plan_price]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planPrice = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, planPrice,
                };
                ctx.session.state = stateList.get_plan_description;
                ctx.reply(enter_plan_description_message, cancel_button);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_plans_buttons);
            }
        }
    }, [stateList.get_plan_description]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const planDescription = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, planDescription,
                };
                ctx.session.state = stateList.get_plan_image;
                ctx.reply(enter_plan_image_message, skip_from_this_step_buttons);
            } else {
                ctx.session.stateData = undefined;
                ctx.reply(text_message_only, manage_plans_buttons);
            }
        }
    }, [stateList.get_plan_image]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.photo) {
                const planImage = ctx.message.photo[0].file_id;
                ctx.session.stateData = {...ctx.session.stateData, planImage};
                ctx.session.state = stateList.register_plan;
                await ctx.replyWithPhoto(planImage, {
                    caption: plan_caption(ctx.session.stateData),
                });
                ctx.reply(select_an_item_message, accept_discard_buttons);
            } else if (ctx.message.text === all_buttons_text.skip_from_this_step) {
                const planImage = "static/img/sample_img.jpg";
                ctx.session.stateData = {...ctx.session.stateData, planImage};
                ctx.session.state = stateList.register_plan;
                await ctx.replyWithPhoto({source: planImage}, {caption: plan_caption(ctx.session.stateData)});
                ctx.reply(select_an_item_message, accept_discard_buttons);
            }
        }
    }, [stateList.register_plan]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.accept) {
            const plan = await PlanModel.findOne({
                title: ctx.session.stateData.planTitle,
            });
            if (!plan) {
                const newPlan = await new PlanModel({
                    title: ctx.session.stateData.planTitle,
                    price: ctx.session.stateData.planPrice,
                    description: ctx.session.stateData.planDescription,
                    image: ctx.session.stateData.planImage,
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
    }, [stateList.remove_plan]: async (ctx, next) => {
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
}