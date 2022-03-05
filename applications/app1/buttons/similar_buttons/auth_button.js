const AdminModel = require('../../models/Admin');
const AdviserModel = require('../../models/Adviser');
const ProStudentModel = require('../../models/ProStudent');
const {admin_start_buttons} = require("../admin_buttons/admin_start_buttons");
const {pro_adviser_start_buttons} = require("../adviser_buttons/pro_adviser_start_buttons");
const {adviser_start_buttons} = require("../adviser_buttons/adviser_start_buttons");
const {user_start_buttons} = require("../user_buttons/user_start_buttons");
const {student_start_buttons} = require("../student_buttons/student_start_buttons");


module.exports.auth_button = async (ctx) => {
    ctx.session = undefined
    const admin = await AdminModel.findOne({username: ctx.chat.username});
    const pro_adviser = await AdviserModel.findOne({username: ctx.chat.username, is_pro: true});
    const normal_adviser = await AdviserModel.findOne({username: ctx.chat.username, is_accepted: true});
    const pro_student = await ProStudentModel.findOne({username: ctx.chat.username, is_pro: true});
    if (admin) {
        return admin_start_buttons;
    } else if (pro_adviser) {
        return pro_adviser_start_buttons;
    } else if (normal_adviser) {
        return adviser_start_buttons;
    } else if (pro_student) {
        return student_start_buttons;
    } else {
        return user_start_buttons;
    }
};