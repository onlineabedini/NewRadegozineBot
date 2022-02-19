const PlanModel = require("../../../models/Plan");
//import stateList
const stateList = require("../../stateList");

//import messages
const {
    enterFullname,
    askingQuestionGuide,
} = require("../../../messages/studentMessages");
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {register_buttons} = require("../../../buttons/user_buttons/register_buttons");
const {plans_buttons} = require("../../../buttons/similar_buttons/plans_buttons");

module.exports = new (class UserService {

    async ask_question(ctx, next) {
        ctx.session.state = stateList.getStudentFullName;
        await ctx.reply(askingQuestionGuide);
        await ctx.reply(enterFullname, cancel_button);
    }

    async register(ctx, next) {
        ctx.reply(
            "لطفا از موارد زیریک مورد را انتخاب نمایید:",
            register_buttons
        );
    }

    async register_as_pro_students(ctx, next) {
        ctx.session = undefined
        const plansData = await PlanModel.find();
        if (plansData.length !== 0) {
            return await ctx.reply(
                `
علیرضا عابدینی
شماره کارت : 
6219861903895505

❌ توجه ❌
- به این شماره کارت هزینه طرح را واریز کنید و عکس ( کاملا واضح ) از فیش پرداخت خود در همین قسمت ارسال کنید.

❌ تذکر ❌ فیش پرداخت رو تا بعد از تایید شدن پرداخت پیش خودتون نگه دارید و دور نندازید تا درصورت درخواست ادمین مجدد تصویر ارسال کنید.

- درصورت بروز هرگونه مشکل با ما تماس بگیرید: 
09924730751
@radegozine_manager`,
                plans_buttons(plansData)
            );
        } else ctx.reply("هیچ طرحی برای ثبت نام یافت نشد");
    }

    async register_as_adviser(ctx, next) {
        ctx.session = undefined
        await ctx.reply("لطفا برای ثبت نام اطلاعات خواسته شده را وارد نمایید : ");
        ctx.session.state = stateList.getAdviserFullNameForRegister;
        ctx.reply(enterFullname, cancel_button);
    }
})();
