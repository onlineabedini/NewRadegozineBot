const PlanModel = require("../../models/Plan");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {skip_from_this_step_buttons} = require("../../buttons/similar_buttons/skip_from_this_step");
const {accept_discard_buttons} = require("../../buttons/similar_buttons/accept_discard_buttons");
const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");
const {manage_plans_buttons} = require("../../buttons/admin_buttons/manage_plans_buttons");

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

const {
    your_request_has_been_canceled,
    input_is_invalid_message,
    text_message_only,
    select_an_item_message,
    something_went_wrong, photo_message_only
} = require("../../messages/similar_messages");

module.exports = {
    [state_list.get_plan_title]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const title = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, title,
                };
                ctx.session.state = state_list.get_plan_price;
                ctx.reply(enter_plan_price_message, cancel_button);
            } else {
                ctx.session.state = state_list.get_plan_title
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_plan_price]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const price = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, price,
                };
                ctx.session.state = state_list.get_plan_description;
                ctx.reply(enter_plan_description_message, cancel_button);
            } else {
                ctx.session.state = state_list.get_plan_price
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_plan_description]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const description = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, description,
                };
                ctx.session.state = state_list.get_plan_image;
                ctx.reply(enter_plan_image_message, skip_from_this_step_buttons);
            } else {
                ctx.session.state = state_list.get_plan_description
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_plan_image]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.photo) {
                const image = ctx.message.photo[0].file_id;
                ctx.session.state_data = {...ctx.session.state_data, image};
                ctx.session.state = state_list.register_plan;
                await ctx.replyWithPhoto(image, {
                    caption: plan_caption(ctx.session.state_data),
                });
                ctx.reply(select_an_item_message, accept_discard_buttons);
            } else if (ctx.message.text === all_buttons_text.skip_from_this_step) {
                const image = {source : "static/img/sample_img.jpg"};
                ctx.session.state_data = {...ctx.session.state_data, image};
                ctx.session.state = state_list.register_plan;
                await ctx.replyWithPhoto(image, {caption: plan_caption(ctx.session.state_data)});
                ctx.reply(select_an_item_message, accept_discard_buttons);
            } else {
                ctx.session.state = state_list.get_plan_image
                ctx.reply(photo_message_only)
            }
        }
    }, [state_list.register_plan]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.accept) {
            const plan = await PlanModel.findOne({
                title: ctx.session.state_data.title,
            });
            if (!plan) {
                const new_plan = await new PlanModel({
                    title: ctx.session.state_data.title,
                    price: ctx.session.state_data.price,
                    description: ctx.session.state_data.description,
                    image: ctx.session.state_data.image,
                });
                await new_plan.save();
                ctx.session = undefined;
                ctx.reply(plan_registered_message, manage_plans_buttons);
            } else {
                ctx.session = undefined;
                ctx.reply(duplicate_plan_message, manage_plans_buttons);
            }
        } else if (ctx.message.text === all_buttons_text.discard) {
            ctx.session = undefined;
            ctx.reply(adding_plan_was_canceled, manage_plans_buttons);
        } else {
            ctx.session = undefined;
            ctx.reply(something_went_wrong, manage_plans_buttons);
        }
    }, [state_list.remove_plan]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let plan = await PlanModel.findById(ctx.session.plan_id);
            if (plan) {
                await PlanModel.findByIdAndDelete(plan._id);
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