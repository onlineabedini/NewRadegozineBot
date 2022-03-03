const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const ProStudentModel = require("../../models/ProStudent");

const {all_buttons_text} = require("../../buttons/all_buttons_text");

const {your_request_has_been_canceled} = require("../../messages/similar_messages");
const {admin_start_buttons} = require("../../buttons/admin_buttons/admin_start_buttons");
const {pro_adviser_start_buttons} = require("../../buttons/adviser_buttons/pro_adviser_start_buttons");
const {adviser_start_buttons} = require("../../buttons/adviser_buttons/adviser_start_buttons");
const {student_start_buttons} = require("../../buttons/student_buttons/student_start_buttons");
const {user_start_buttons} = require("../../buttons/user_buttons/user_start_buttons");

module.exports = {
    [all_buttons_text.cancel]: async (ctx) => {
        ctx.session = undefined;
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        const pro_adviser = await AdviserModel.findOne({
            userName: ctx.chat.username, is_pro: true,
        });
        const normal_adviser = await AdviserModel.findOne({
            userName: ctx.chat.username, is_accepted: true,
        });
        const pro_student = await ProStudentModel.findOne({
            userName: ctx.chat.username, is_pro: true,
        });

        if (admin) {
            ctx.reply(your_request_has_been_canceled, admin_start_buttons);
        } else if (pro_adviser) {
            ctx.reply(your_request_has_been_canceled, pro_adviser_start_buttons);
        } else if (normal_adviser) {
            ctx.reply(your_request_has_been_canceled, adviser_start_buttons);
        } else if (pro_student) {
            ctx.reply(your_request_has_been_canceled, student_start_buttons);
        } else {
            ctx.reply(your_request_has_been_canceled, user_start_buttons);
        }
    },
}