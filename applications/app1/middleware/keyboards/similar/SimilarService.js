const Admin = require("../../../models/Admin");
const Adviser = require("../../../models/Adviser");

const {selectAnItem, requestCanceled, botDevelopersCaption} = require("../../../messages/similarMessages");
const {adminStartButtons} = require("../../../buttons/adminButtons/adminStartButtons");
const {adviserStartButtons} = require("../../../buttons/adviserButtons/adviserStartButtons");
const {studentStartButtons} = require("../../../buttons/studentButtons/studentStartButtons");

module.exports = new class SimilarService {
    async cancel(ctx, next) {
        ctx.session.state = undefined;
        ctx.session.stateData = undefined;
        const admin = await Admin.findOne({Username: ctx.message.chat.username});
        const adviser = await Adviser.findOne({
            Username: ctx.message.chat.username,
        });
        if (admin) {
            await ctx.reply(requestCanceled, adminStartButtons);
        } else if (adviser) {
            await ctx.reply(requestCanceled, adviserStartButtons);
        } else {
            await ctx.reply(requestCanceled, studentStartButtons);
        }
    }

    async back(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply( selectAnItem , adminStartButtons);
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