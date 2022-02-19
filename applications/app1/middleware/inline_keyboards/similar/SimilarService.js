const AdminModel = require("../../../models/Admin");
const QuestionerModel = require('../../../models/Questioner');
const stateList = require('../../stateList')
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {confidence_buttons} = require("../../../buttons/similar_buttons/confidence_buttons");
const {dont_change} = require("../../../buttons/similar_buttons/dont_change");
module.exports = new class SimilarService {
    async selectPlan(ctx, matches) {
        await ctx.telegram.deleteMessage(ctx.session.chatId, ctx.session.messageId);
        const planId = matches[0].split("_")[1];
        ctx.session.stateData = {
            ...ctx.session.stateData,
            planId,
        };
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        if (admin) {
            if (ctx.session.status === "update") {
                await ctx.reply(
                    "لطفا نام و نام خانوادگی دانش آموز را وارد کنید:",
                    dont_change
                );
                ctx.session.state = stateList.getProStudentFullNameFromAdmin;
            } else {
                await ctx.reply(
                    "لطفا نام و نام خانوادگی دانش آموز را وارد کنید:",
                    cancel_button
                );
                ctx.session.state = stateList.getProStudentFullNameFromAdmin;
            }
        } else {
            ctx.session.state = stateList.getProStudentFullName;
            ctx.reply("لطفا نام و نام خانوادگی خود را وارد کنید:", cancel_button);
        }
    }

    async answer(ctx, matches) {
        const questionerId = matches[0].split("_")[1];
        const questioner = await QuestionerModel.findById(questionerId);
        if (questioner) {
            ctx.session.state = stateList.answer
            ctx.session.questioner = questioner
            ctx.reply("لطفا پاسخ خود را بصورت ویس وارد نمایید : ", cancel_button);
        } else {
            ctx.reply("این کاربر دیگر وجود ندارد.")
        }
    }

    async delete(ctx, matches) {
        const questionerId = matches[0].split("_")[1];
        ctx.reply("آیا از حذف این سوال اطمینان دارید؟", confidence_buttons)
        ctx.session.questionerId = questionerId
        ctx.session.state = stateList.removeQuestion
    }


}