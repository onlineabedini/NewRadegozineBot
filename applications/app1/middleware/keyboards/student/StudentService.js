const stateList = require("../../stateList");
const {cancelButton} = require("../../../buttons/similarButtons/cancelButton");
const {showPlansButton, contactWithAdminButton} = require("../../../buttons/studentButtons/studentStartButtons");
const {
    enterFullname,
    seePlansMessage,
    askingQuestionGuide,
    contactWithAdminMessage
} = require("../../../messages/studentMessages");

module.exports = new class StudentService {
    async askQuestion(ctx, next) {
        ctx.session.state = stateList.GETSTUDENTFULLNAME;
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