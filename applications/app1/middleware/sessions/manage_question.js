const QuestionModel = require("../../models/Question");
const ChannelModel = require("../../models/Channel");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {auth_button} = require("../../buttons/similar_buttons/auth_button");
const {channel_post_buttons} = require("../../buttons/similar_buttons/channel_post_buttons");

const {
    enter_field_message, text_message_only, enter_grade_message,
    voice_caption,
    your_answer_registered_message,
    bot_is_not_a_member_of_any_channels_message,
    voice_message_only,
    question_was_removed_message,
    this_question_has_already_been_removed_message,
    your_request_has_been_canceled,
    input_is_invalid_message
} = require("../../messages/similar_messages");

const {
    enter_your_question_as_text,
    your_question_registrated_message,
    your_question_answered_message
} = require("../../messages/student_messages");
const {messages_list_buttons} = require("../../buttons/admin_buttons/messages_list_buttons");
const {the_name_was_successfully_tagged_to_the_question_message} = require("../../messages/admin_messages");

module.exports = {
    //ask question
    [state_list.get_student_fullname]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const fullname = ctx.message.text;
                ctx.session.state_data = {...ctx.session.state_data, fullname};
                ctx.session.state = state_list.get_student_field;
                ctx.reply(enter_field_message);
            } else {
                ctx.session.state = state_list.get_student_fullname
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_student_field]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const field = ctx.message.text;
                ctx.session.state_data = {...ctx.session.state_data, field};
                ctx.session.state = state_list.get_student_grade;
                ctx.reply(enter_grade_message);
            } else {
                ctx.session.state = state_list.get_student_field
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.get_student_grade]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const grade = ctx.message.text;
                ctx.session.state_data = {...ctx.session.state_data, grade};
                ctx.session.state = state_list.ask_question;
                ctx.reply(enter_your_question_as_text);
            } else {
                ctx.session.state = state_list.get_student_grade
                ctx.reply(text_message_only);
            }
        }
    }, [state_list.ask_question]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text) {
                const new_question = await new QuestionModel({
                    chat_id: ctx.message.chat.id,
                    username: ctx.message.chat.username,
                    fullname: ctx.session.state_data.fullname,
                    field: ctx.session.state_data.field,
                    grade: ctx.session.state_data.grade,
                    message_id: ctx.message.message_id,
                    message_text: ctx.message.text,
                });
                await new_question.save();
                ctx.session = undefined;
                ctx.reply(your_question_registrated_message, await auth_button(ctx));
            } else {
                ctx.session.state = state_list.ask_question
                ctx.reply(text_message_only);
            }
        }
    },
    // answer question
    [state_list.answer]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.voice) {
            const channels = await ChannelModel.find();
            if (channels.length !== 0) {
                const question = ctx.session.question;
                channels.forEach((channel) => {
                    ctx.telegram.sendVoice(channel.chat_id, ctx.message.voice.file_id, {
                        caption: voice_caption(question), reply_markup: channel_post_buttons,
                    });
                });
                ctx.reply(your_answer_registered_message, await auth_button(ctx));
                await ctx.telegram.sendMessage(question.chat_id, your_question_answered_message);
                await QuestionModel.findOneAndDelete({
                    chat_id: question.chat_id,
                });
                ctx.session = undefined;
            } else {
                ctx.session = undefined;
                ctx.reply(bot_is_not_a_member_of_any_channels_message, await auth_button(ctx));
            }
        } else {
            ctx.session.state = state_list.answer
            ctx.reply(voice_message_only);
        }
    },
    // remove question
    [state_list.remove_question]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let question = await QuestionModel.findById(ctx.session.question_id);
            if (question) {
                await QuestionModel.findByIdAndDelete(question._id);
                ctx.session = undefined;
                ctx.reply(question_was_removed_message, await auth_button(ctx));
            } else {
                ctx.session = undefined;
                ctx.reply(this_question_has_already_been_removed_message, await auth_button(ctx));
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.session = undefined;
            ctx.reply(your_request_has_been_canceled, await auth_button(ctx));
        } else {
            ctx.session = undefined;
            ctx.reply(input_is_invalid_message, await auth_button(ctx));
        }
    }, [state_list.tag_person]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text) {
            const question = await QuestionModel.findByIdAndUpdate(ctx.session.question_id , {
                tag : ctx.message.text
            })
            await question.save()
            ctx.reply(the_name_was_successfully_tagged_to_the_question_message , messages_list_buttons )
        } else {
            ctx.session.state = state_list.tag_person
            ctx.reply(text_message_only);
        }
    }
}