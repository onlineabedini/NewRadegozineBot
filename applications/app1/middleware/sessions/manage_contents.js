const stateList = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const ContentModel = require("../../models/Content");
const {manage_content_production_buttons} = require("../../buttons/admin_buttons/manage_content_production_buttons");
const {
    your_request_has_been_canceled, input_is_invalid_message, text_message_only
} = require("../../messages/similar_messages");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
module.exports = {
    [stateList.get_content_title]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const contentTitle = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, contentTitle,
                };
                ctx.session.state = stateList.get_content_description;
                ctx.reply("لطفا توضیحاتی را در این باره وارد نمایید : ", cancel_button);
            } else {
                ctx.session = undefined;
                ctx.reply(text_message_only, manage_content_production_buttons);
            }
        }
    }, [stateList.get_content_description]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const contentDescription = await ctx.message.text;
                const content = await ContentModel.findById(ctx.session.contentId);
                if (content && ctx.session.status === "update") {
                    await ContentModel.findByIdAndUpdate(ctx.session.contentId, {
                        title: ctx.session.stateData.contentTitle, contentDescription,
                    }, {new: true});
                    ctx.session = undefined;
                    ctx.reply("عنوان تولید محتوا با موفقیت ویراش شد.", manage_content_production_buttons);
                } else if (ctx.session.status === "create") {
                    const newContent = new ContentModel({
                        title: ctx.session.stateData.contentTitle, contentDescription,
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
    }, [stateList.remove_content]: async (ctx, next) => {
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
}