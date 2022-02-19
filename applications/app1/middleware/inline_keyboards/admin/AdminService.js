const PlanModel = require("../../../models/Plan");
const ProStudentModel = require("../../../models/ProStudent");
const stateList = require("../../stateList");
const {
  plans_buttons,
} = require("../../../buttons/similar_buttons/plans_buttons");
const {
  manage_pro_students_buttons,
} = require("../../../buttons/admin_buttons/manage_pro_students_buttons");
const {
  cancel_button,
} = require("../../../buttons/similar_buttons/cancel_button");
const {
  confidence_buttons,
} = require("../../../buttons/similar_buttons/confidence_buttons");

module.exports = new (class AdminService {
  async removeStudent(ctx, matches) {
    const studentId = matches[0].split("_")[2];
    ctx.reply("آیا تمایل به حذف این دانش آموز دارید؟", confidence_buttons);
    ctx.session.studentId = studentId;
    ctx.session.state = stateList.removeStudent;
  }

  async updateStudent(ctx, matches) {
    ctx.session = undefined;
    const studentId = matches[0].split("_")[2];
    const student = await ProStudentModel.findById(studentId);
    if (student) {
      const plans = await PlanModel.find();
      if (plans.length !== 0) {
        const tempMessage = await ctx.reply(
          "لطفا طرح مورد نظر خود را وارد کنید : ",
          plans_buttons(plans)
        );
        ctx.session.status = "update";
        ctx.session.student = student;
        ctx.session.chatId = tempMessage.chat.id;
        ctx.session.messageId = tempMessage.message_id;
      } else
        await ctx.reply(
          "هیچ طرحی برای ثبت نام یافت نشد",
          manage_pro_students_buttons
        );
    } else {
      ctx.session = undefined;
      ctx.reply("این دانش آموز قبلا حذف شده است.");
    }
  }

  async removePlan(ctx, matches) {
    const planId = matches[0].split("_")[2];
    ctx.reply("آیا تمایل به حذف این طرح دارید؟", confidence_buttons);
    ctx.session.planId = planId;
    ctx.session.state = stateList.removePlan;
  }

  async updatePlan(ctx, matches) {
    ctx.reply("این بخش در حال انجام است.");
  }

  async acceptStudent(ctx, matches) {
    const studentId = matches[0].split("_")[1];
    ctx.reply(
      "آیا از پذیرفتن این دانش آموز اطمینان دارید ؟ ",
      confidence_buttons
    );
    ctx.session.studentId = studentId;
    ctx.session.state = stateList.acceptStudent;
  }

  async rejectStudent(ctx, matches) {
    const studentId = matches[0].split("_")[1];
    ctx.reply(
      "آیا از نپذیرفتن این دانش آموز اطمینان دارید ؟ ",
      confidence_buttons
    );
    ctx.session.studentId = studentId;
    ctx.session.state = stateList.rejectStudent;
  }

  async sendMessage(ctx, matches) {
    const studentId = matches[0].split("_")[1];
    const student = await ProStudentModel.findById(studentId);
    if (student) {
      const userChatId = student.userChatId;
      ctx.session.stateData = {
        ...ctx.session.stateData,
        userChatId,
      };
      ctx.session.state = stateList.sendMessageForRegStudents;
      await ctx.reply("لطفا پیام خود را وارد نمایید : ", cancel_button);
    } else {
      ctx.reply("این دانش آموز قبلا حذف شده است.");
    }
  }

  async acceptAdviser(ctx, matches) {
    const regAdviserId = matches[0].split("_")[2];
    await ctx.reply("آیا تمایل به پذیرش این مشاور دارید؟", confidence_buttons);
    ctx.session.regAdviserId = regAdviserId;
    ctx.session.state = stateList.acceptAdviser;
  }

  async rejectAdviser(ctx, matches) {
    const regAdviserId = matches[0].split("_")[2];
    await ctx.reply("آیا تمایل به رد این مشاور دارید؟", confidence_buttons);
    ctx.session.regAdviserId = regAdviserId;
    ctx.session.state = stateList.rejectAdviser;
  }
})();
