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
    const admin = await AdminModel.findOne({userName: ctx.chat.username});
    const proAdviser = await AdviserModel.findOne({userName: ctx.chat.username, isPro: true});
    const normalAdviser = await AdviserModel.findOne({userName: ctx.chat.username, isAccepted: true});
    const proStudent = await ProStudentModel.findOne({userName: ctx.chat.username, isPro: true});
    if (admin) {
        return admin_start_buttons;
    } else if (proAdviser) {
        return pro_adviser_start_buttons;
    } else if (normalAdviser) {
        return adviser_start_buttons;
    } else if (proStudent) {
        return student_start_buttons;
    } else {
        return user_start_buttons;
    }
};