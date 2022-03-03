const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");
const {
    enter_pro_student_grade_message, enter_pro_student_level_message, no_student_found_message
} = require("../../messages/admin_messages");
const {enter_grade_buttons} = require("../../buttons/similar_buttons/enter_grade_buttons");
const {
    input_is_invalid_message,
    enter_pro_student_content_message,
    content_sent_message,
    no_student_found_with_these_filters_message
} = require("../../messages/similar_messages");
const {auth_button} = require("../../buttons/similar_buttons/auth_button");
const {enter_level_buttons} = require("../../buttons/similar_buttons/enter_level_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const ProStudentModel = require("../../models/ProStudent");
const UserModel = require("../../models/User");
module.exports = {
    [state_list.get_field_for_send_content]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi || ctx.message.text === all_buttons_text.tajrobi || ctx.message.text === all_buttons_text.ensani || ctx.message.text === all_buttons_text.honar || ctx.message.text === all_buttons_text.zaban || ctx.message.text === all_buttons_text.other_fields) {
                const contentField = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, contentField,
                };
                ctx.session.state = state_list.get_grade_for_send_content;
                ctx.reply(enter_pro_student_grade_message, enter_grade_buttons);
            } else {
                ctx.session = undefined;
                ctx.reply(input_is_invalid_message, await auth_button(ctx));
            }
        }
    }, [state_list.get_grade_for_send_content]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth || ctx.message.text === all_buttons_text.eleventh || ctx.message.text === all_buttons_text.twelfth) {
                const contentGrade = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, contentGrade,
                };
                ctx.session.state = state_list.get_level_for_send_content;
                ctx.reply(enter_pro_student_level_message, enter_level_buttons);
            } else {
                ctx.session = undefined;
                ctx.reply(input_is_invalid_message, await auth_button(ctx));
            }
        }
    }, [state_list.get_level_for_send_content]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.low || ctx.message.text === all_buttons_text.medium || ctx.message.text === all_buttons_text.high || ctx.message.text === all_buttons_text.genius) {
                const contentLevel = await ctx.message.text;
                ctx.session.stateData = {
                    ...ctx.session.stateData, contentLevel,
                };
                ctx.session.state = state_list.send_content_for_pro_students;
                ctx.reply(enter_pro_student_content_message, cancel_button);
            } else {
                ctx.session = undefined;
                ctx.reply(input_is_invalid_message, await auth_button(ctx));
            }
        }
    }, [state_list.send_content_for_pro_students]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const students = await ProStudentModel.find({
                is_pro: true,
                field: ctx.session.stateData.contentField,
                grade: ctx.session.stateData.contentGrade,
                level: ctx.session.stateData.contentLevel,
            });
            if (students.length !== 0) {
                students.forEach((student) => {
                    student.chat_id ? ctx.telegram.copyMessage(student.chat_id, ctx.chat.id, ctx.message.message_id) : ctx.reply(`🔴  این محتوا برای دانش آموزی به نام ${student.fullname} با نام کاربری @${student.userName} ارسال نشده است. 
🔵 این پیام نشان دهنده ی start نزدن بات از جانب دانش آموز ثبت نام شده است.`);
                });
                ctx.session = undefined;
                ctx.reply(content_sent_message, await auth_button(ctx));
            } else {
                ctx.session = undefined;
                ctx.reply(no_student_found_with_these_filters_message, await auth_button(ctx));
            }
        }
    }, [state_list.send_content_for_all_students]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const users = await UserModel.find();
            if (users.length !== 0) {
                users.forEach((user) => {
                    ctx.telegram.copyMessage(user.chat_id, ctx.chat.id, ctx.message.message_id);
                });
                ctx.session = undefined;
                ctx.reply(content_sent_message, await auth_button(ctx));
            } else {
                ctx.session = undefined;
                ctx.reply(no_student_found_message, await auth_button(ctx));
            }
        }
    },
}