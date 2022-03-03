const state_list = require("../state_list");
const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {send_content_for_students} = require("../../buttons/similar_buttons/send_content_for_students");
const {enter_field_buttons} = require("../../buttons/similar_buttons/enter_field_buttons");
const {cancel_button} = require("../../buttons/similar_buttons/cancel_button");

const {
    select_an_item_message,
    select_field_for_sending_content_message,
    enter_content_message
} = require("../../messages/similar_messages");

module.exports = {
    [all_buttons_text.send_content_for_students]: async (ctx) => {
        ctx.reply(select_an_item_message, send_content_for_students);
    },
    [all_buttons_text.send_content_for_pro_students]: async (ctx) => {
        ctx.session.state = state_list.get_field_for_send_content;
        ctx.reply(select_field_for_sending_content_message, enter_field_buttons);
    },
    [all_buttons_text.send_content_for_all_students]: async (ctx) => {
        ctx.session.state = state_list.send_content_for_all_students;
        ctx.reply(enter_content_message, cancel_button);
    },
}