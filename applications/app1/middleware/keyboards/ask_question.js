const {all_buttons_text} = require("../../buttons/all_buttons_text");
const state_list = require("../state_list");

const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");
const {contact_with_pro_advisers} = require("../../buttons/student_buttons/contact_with_pro_advisers");

const {asking_question_guide, ask_question_from_pro_adviser_message} = require("../../messages/student_messages");
const {enter_full_name_message} = require("../../messages/similar_messages");

module.exports = {
    [all_buttons_text.ask_question]: async (ctx) => {
        ctx.session.state = state_list.get_student_fullname;
        await ctx.reply(asking_question_guide);
        await ctx.reply(enter_full_name_message, cancel_button);
    },
    [all_buttons_text.ask_question_from_pro_adviser]: async (ctx) => {
        ctx.reply(ask_question_from_pro_adviser_message, contact_with_pro_advisers);
    },
}