const UserModel = require("../../models/User");
const QuestionerModel = require("../../models/Questioner");
const ProStudentModel = require("../../models/ProStudent");
const ChannelModel = require("../../models/Channel");

const {
    voice_message_only,
    voice_caption,
    your_answer_registered_message,
    bot_is_not_a_member_of_any_channels_message,
    question_was_removed_message,
    this_question_has_already_been_removed_message,
    your_request_has_been_canceled,
    enter_pro_student_content_message,
    content_sent_message,
    no_student_found_with_these_filters_message,
    input_is_invalid_message,
} = require("../../messages/similar_messages");
const {auth_button} = require("../../buttons/similar_buttons/auth_button");
const {
    channel_post_buttons,
} = require("../../buttons/similar_buttons/channel_post_buttons");
const {
    your_question_answered_message,
} = require("../../messages/student_messages");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const stateList = require("../stateList");
const {
    enter_grade_buttons,
} = require("../../buttons/similar_buttons/enter_grade_buttons");
const {
    enter_level_buttons,
} = require("../../buttons/similar_buttons/enter_level_buttons");
const {
    cancel_button,
} = require("../../buttons/similar_buttons/cancel_button");
const {
    enter_pro_student_level_message, enter_pro_student_grade_message, no_student_found_message,
} = require("../../messages/admin_messages");

module.exports = {
    [stateList.answer]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.voice) {
            const channels = await ChannelModel.find();
            if (channels.length !== 0) {
                const questioner = ctx.session.questioner;
                channels.forEach((channel) => {
                    ctx.telegram.sendVoice(channel.channelChatId, ctx.message.voice.file_id, {
                        caption: voice_caption(questioner), reply_markup: channel_post_buttons,
                    });
                });
                ctx.reply(your_answer_registered_message, await auth_button(ctx));
                await ctx.telegram.sendMessage(questioner.userChatId, your_question_answered_message);
                await QuestionerModel.findOneAndDelete({
                    userChatId: questioner.userChatId,
                });
                ctx.session = undefined;
            } else {
                ctx.session.questioner = undefined;
                ctx.reply(bot_is_not_a_member_of_any_channels_message, await auth_button(ctx));
            }
        } else {
            ctx.session.questioner = undefined;
            ctx.reply(voice_message_only, await auth_button(ctx));
        }
    }, [stateList.removeQuestion]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let questionerId = await QuestionerModel.findById(ctx.session.questionerId);
            if (questionerId) {
                await QuestionerModel.findByIdAndDelete(ctx.session.questionerId);
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
    }, [stateList.getFieldForSendContent]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi || ctx.message.text === all_buttons_text.tajrobi || ctx.message.text === all_buttons_text.ensani || ctx.message.text === all_buttons_text.honar || ctx.message.text === all_buttons_text.zaban || ctx.message.text === all_buttons_text.other_fields) {
                const contentField = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, contentField,
                };
                ctx.session.state = stateList.getGradeForSendContent;
                ctx.reply(enter_pro_student_grade_message, enter_grade_buttons);
            } else {
                ctx.session = undefined;
                ctx.reply(input_is_invalid_message, await auth_button(ctx));
            }
        }
    }, [stateList.getGradeForSendContent]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth || ctx.message.text === all_buttons_text.eleventh || ctx.message.text === all_buttons_text.twelfth) {
                const contentGrade = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, contentGrade,
                };
                ctx.session.state = stateList.getLevelForSendContent;
                ctx.reply(enter_pro_student_level_message, enter_level_buttons);
            } else {
                ctx.session = undefined;
                ctx.reply(input_is_invalid_message, await auth_button(ctx));
            }
        }
    }, [stateList.getLevelForSendContent]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.low || ctx.message.text === all_buttons_text.medium || ctx.message.text === all_buttons_text.high || ctx.message.text === all_buttons_text.genius) {
                const contentLevel = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, contentLevel,
                };
                ctx.session.state = stateList.sendContentForProStudents;
                ctx.reply(enter_pro_student_content_message, cancel_button);
            } else {
                ctx.session = undefined;
                ctx.reply(input_is_invalid_message, await auth_button(ctx));
            }
        }
    }, [stateList.sendContentForProStudents]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const students = await ProStudentModel.find({
                isPro: true,
                userField: ctx.session.stateData.contentField,
                userGrade: ctx.session.stateData.contentGrade,
                userLevel: ctx.session.stateData.contentLevel,
            });
            if (students.length !== 0) {
                students.forEach((student) => {
                    student.userChatId ? ctx.telegram.copyMessage(student.userChatId, ctx.chat.id, ctx.message.message_id) : ctx.reply(`🔴  این محتوا برای دانش آموزی به نام ${student.userFullName} با نام کاربری @${student.userName} ارسال نشده است. 
🔵 این پیام نشان دهنده ی start نزدن بات از جانب دانش آموز ثبت نام شده است.`);
                });
                ctx.session = undefined;
                ctx.reply(content_sent_message, await auth_button(ctx));
            } else {
                ctx.session = undefined;
                ctx.reply(no_student_found_with_these_filters_message, await auth_button(ctx));
            }
        }
    }, [stateList.sendContentForAllStudents]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const users = await UserModel.find();
            if (users.length !== 0) {
                users.forEach((user) => {
                    ctx.telegram.copyMessage(user.userChatId, ctx.chat.id, ctx.message.message_id);
                });
                ctx.session = undefined;
                ctx.reply(content_sent_message, await auth_button(ctx));
            } else {
                ctx.session = undefined;
                ctx.reply(no_student_found_message, await auth_button(ctx));
            }
        }
    },
};
