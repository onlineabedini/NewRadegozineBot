//import stateList
const stateList = require("../../stateList");

//import buttons
const {cancelButton} = require("../../../buttons/similarButtons/cancelButton");
const {showPlansButton, contactWithAdminButton} = require("../../../buttons/studentButtons/studentStartButtons");

//import messages
const {
    enterFullname,
    seePlansMessage,
    askingQuestionGuide,
    contactWithAdminMessage
} = require("../../../messages/studentMessages");

module.exports = new class StudentService {
    async askQuestion(ctx, next) {
        ctx.session.state = stateList.getStudentFullName;
        await ctx.reply(askingQuestionGuide, cancelButton);
        await ctx.reply(enterFullname);
    }

    async showPlans(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(seePlansMessage, showPlansButton);
    }

    async contactWithAdmin(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(contactWithAdminMessage, contactWithAdminButton);
    }
}