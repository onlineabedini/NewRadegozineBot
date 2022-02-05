const stateList  = require("../../stateList");

const {
    cancelBtn,
    plansBtn,
    contactWithAdminBtn,
} = require("../../../buttons/ButtonManager");

const {
    TIP,
    ENTERFULLNAME,
    SEEPLANS,
    CONTACTWITHADMIN,
} = require("../../../messages/MessageHandler");

module.exports = new class StudentService{
    async askQuestion(ctx , next){
        ctx.session.state = stateList.GETSTUDENTFULLNAME;
        await ctx.reply(TIP, cancelBtn);
        await ctx.reply(ENTERFULLNAME);
    }
    async showPlans(ctx , next){
        ctx.session.state = undefined;
        await ctx.reply(SEEPLANS, plansBtn);
    }
    async contactWithAdmin(ctx, next){
        ctx.session.state = undefined;
        await ctx.reply(CONTACTWITHADMIN, contactWithAdminBtn);
    }
}