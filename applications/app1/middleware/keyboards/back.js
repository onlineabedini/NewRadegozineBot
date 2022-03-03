const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const ProStudentModel = require("../../models/ProStudent");

const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {select_an_item_message} = require("../../messages/similar_messages");
const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");
const {pro_adviser_start_buttons} = require("../../buttons/adviser_buttons/pro_adviser_start_buttons");
const {adviser_start_buttons} = require("../../buttons/adviser_buttons/adviser_start_buttons");
const {student_start_buttons} = require("../../buttons/student_buttons/student_start_buttons");
const {user_start_buttons} = require("../../buttons/user_buttons/user_start_buttons");

module.exports = {
    [all_buttons_text.back]: async (ctx) => {
        ctx.session = undefined;
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        const proAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, is_pro: true,
        });
        const normalAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, is_accepted: true,
        });
        const proStudent = await ProStudentModel.findOne({
            userName: ctx.chat.username, is_pro: true,
        });

        if (admin) {
            ctx.reply(select_an_item_message, admin_start_buttons);
        } else if (proAdviser) {
            ctx.reply(select_an_item_message, pro_adviser_start_buttons);
        } else if (normalAdviser) {
            ctx.reply(select_an_item_message, adviser_start_buttons);
        } else if (proStudent) {
            ctx.reply(select_an_item_message, student_start_buttons);
        } else {
            ctx.reply(select_an_item_message, user_start_buttons);
        }
    },
}