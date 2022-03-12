const AdviserModel = require('../../models/Adviser');

const {all_buttons_text} = require("../../buttons/all_buttons_text");
const state_list = require("../state_list");

const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {asking_question_guide, ask_question_from_pro_adviser_message} = require("../../messages/student_messages");
const {enter_full_name_message} = require("../../messages/similar_messages");
const {no_adviser_found_message} = require("../../messages/admin_messages");
const {pro_advisers_buttons} = require("../../buttons/student_buttons/pro_advisers_buttons");

module.exports = {
    [all_buttons_text.ask_question]: async (ctx) => {
        ctx.session.state = state_list.get_student_fullname;
        await ctx.reply(asking_question_guide);
        await ctx.reply(enter_full_name_message, cancel_button);
    },
    [all_buttons_text.ask_question_from_pro_adviser]: async (ctx) => {
        const pro_adviser = await AdviserModel.find({is_pro: true});
        if (pro_adviser.length !== 0) {
            await ctx.reply(ask_question_from_pro_adviser_message, pro_advisers_buttons(pro_adviser));
        } else {
            await ctx.reply(no_adviser_found_message);
        }
    },
}