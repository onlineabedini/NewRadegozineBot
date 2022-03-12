const ProStudentModel = require("../../models/ProStudent");
const UserModel = require("../../models/User");
const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {enter_grade_buttons} = require("../../buttons/similar_buttons/enter_grade_buttons");
const {auth_button} = require("../../buttons/similar_buttons/auth_button");
const {enter_level_buttons} = require("../../buttons/similar_buttons/enter_level_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {
    enter_pro_student_grade_message,
    enter_pro_student_level_message,
    no_student_found_message
} = require("../../messages/admin_messages");
const {
    input_is_invalid_message,
    enter_pro_student_content_message,
    content_sent_message,
    no_student_found_with_these_filters_message
} = require("../../messages/similar_messages");

module.exports = {
    [state_list.get_field_for_send_content]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi ||
                ctx.message.text === all_buttons_text.tajrobi ||
                ctx.message.text === all_buttons_text.ensani ||
                ctx.message.text === all_buttons_text.honar ||
                ctx.message.text === all_buttons_text.zaban ||
                ctx.message.text === all_buttons_text.other_fields) {
                const content_field = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, content_field,
                };
                ctx.session.state = state_list.get_grade_for_send_content;
                ctx.reply(enter_pro_student_grade_message, enter_grade_buttons);
            } else {
                ctx.session.state = state_list.get_field_for_send_content
                ctx.reply(input_is_invalid_message);
            }
        }
    }, [state_list.get_grade_for_send_content]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth ||
                ctx.message.text === all_buttons_text.eleventh ||
                ctx.message.text === all_buttons_text.twelfth) {
                const content_grade = await ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, content_grade,
                };
                ctx.session.state = state_list.get_level_for_send_content;
                ctx.reply(enter_pro_student_level_message, enter_level_buttons);
            } else {
                ctx.session.state = state_list.get_grade_for_send_content
                ctx.reply(input_is_invalid_message);
            }
        }
    }, [state_list.get_level_for_send_content]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.low ||
                ctx.message.text === all_buttons_text.medium ||
                ctx.message.text === all_buttons_text.high ||
                ctx.message.text === all_buttons_text.genius) {
                const content_level = ctx.message.text;
                ctx.session.state_data = {
                    ...ctx.session.state_data, content_level,
                };
                ctx.session.state = state_list.send_content_for_pro_students;
                ctx.reply(enter_pro_student_content_message, cancel_button);
            } else {
                ctx.session.state = state_list.get_level_for_send_content
                ctx.reply(input_is_invalid_message);
            }
        }
    }, [state_list.send_content_for_pro_students]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const students = await ProStudentModel.find({
                is_pro: true,
                field: ctx.session.state_data.content_field,
                grade: ctx.session.state_data.content_grade,
                level: ctx.session.state_data.content_level,
            });
            if (students.length !== 0) {
                students.forEach((student) => {
                    student.chat_id ? ctx.telegram.copyMessage(student.chat_id, ctx.chat.id, ctx.message.message_id) : ctx.reply(`🔴  این محتوا برای دانش آموزی به نام ${student.fullname} با نام کاربری @${student.userName} ارسال نشده است. 
🔵 این پیام نشان دهنده ی start نزدن بات از جانب این دانش آموز است.`);
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
            const pro_students = await ProStudentModel.find({is_pro: true});
            if (pro_students.length !== 0) {
                pro_students.forEach((pro_student) => {
                    ctx.telegram.copyMessage(pro_student.chat_id, ctx.chat.id, ctx.message.message_id);
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