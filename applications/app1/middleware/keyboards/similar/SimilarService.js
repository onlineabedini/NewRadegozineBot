//import models
const AdminModel = require("../../../models/Admin");
const AdviserModel = require("../../../models/Adviser");

//import buttons
const {adminStartButtons} = require("../../../buttons/adminButtons/adminStartButtons");
const {adviserStartButtons} = require("../../../buttons/adviserButtons/adviserStartButtons");
const {studentStartButtons} = require("../../../buttons/studentButtons/studentStartButtons");

//import messages
const {selectAnItem, requestCanceled, botDevelopersCaption} = require("../../../messages/similarMessages");

//define SimilarService class
// create an instance
module.exports = new class SimilarService {
    async cancel(ctx, next) {
        ctx.session.state = undefined;
        ctx.session.stateData = undefined;
        const admin = await AdminModel.findOne({userName: ctx.message.chat.username});
        const adviser = await AdviserModel.findOne({
            userName: ctx.message.chat.username,
        });
        if (admin) {
            return await ctx.reply(requestCanceled, adminStartButtons);
        } else if (adviser) {
            return await ctx.reply(requestCanceled, adviserStartButtons);
        } else {
            return await ctx.reply(requestCanceled, studentStartButtons);
        }
    }

    async back(ctx, next) {
        ctx.session.state = undefined;
        const admin = await AdminModel.findOne({userName: ctx.message.chat.username});
        const adviser = await AdviserModel.findOne({
            userName: ctx.message.chat.username,
        });
        if (admin) {
            return await ctx.reply(selectAnItem, adminStartButtons);
        } else if (adviser) {
            return await ctx.reply(selectAnItem, adviserStartButtons);
        } else {
            return await ctx.reply(selectAnItem, studentStartButtons);
        }
    }

    async botDevelopersInfo(ctx, next) {
        ctx.session.state = undefined;
        await ctx.replyWithPhoto(
            {source: "static/img/irnode.jpg"},
            {
                caption: botDevelopersCaption,
            }
        );
    }
};