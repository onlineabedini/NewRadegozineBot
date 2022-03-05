const ContentModel = require("../../models/Content");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {content_production_buttons} = require("../../buttons/admin_buttons/content_production_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {
    your_request_has_been_canceled, input_is_invalid_message, text_message_only
} = require("../../messages/similar_messages");

module.exports = {
    [state_list.get_content_title]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const content_title = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, content_title,
                };
                ctx.session.state = state_list.get_content_description;
                ctx.reply("لطفا توضیحاتی را در این باره وارد نمایید : ", cancel_button);
            } else {
                ctx.session.state = state_list.get_content_title;
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_content_description]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const content_description = ctx.message.text;
                const content = await ContentModel.findById(ctx.session.content_id);
                if (content && ctx.session.status === "update") {
                    await ContentModel.findByIdAndUpdate(content._id, {
                        title: ctx.session.state_data.content_title,
                        description: content_description
                    }, {new: true});
                    ctx.session = undefined;
                    ctx.reply("عنوان تولید محتوا با موفقیت ویراش شد.", content_production_buttons);
                } else if (ctx.session.status === "create") {
                    const new_content = await new ContentModel({
                        title: ctx.session.state_data.content_title,
                        description: content_description
                    });
                    await new_content.save();
                    ctx.session = undefined;
                    ctx.reply("عنوان تولید محتوا با موفقیت ثبت شد.", content_production_buttons);
                } else {
                    ctx.session = undefined;
                    ctx.reply("این عنوان قبلا حذف شده است.", content_production_buttons);
                }
            } else {
                ctx.session.state = state_list.get_content_description
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.remove_content]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let content = await ContentModel.findById(ctx.session.content_id);
            if (content) {
                await ContentModel.findByIdAndDelete(content._id);
                ctx.reply("این عنوان با موفقیت حذف گردید.", content_production_buttons);
                ctx.session = undefined;
            } else {
                ctx.reply("این عنوان در حال حاضر حذف شده است.", content_production_buttons);
                ctx.session = undefined;
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.reply(your_request_has_been_canceled, content_production_buttons);
            ctx.session = undefined;
        } else {
            ctx.reply(input_is_invalid_message, content_production_buttons);
            ctx.session = undefined;
        }
    },
}