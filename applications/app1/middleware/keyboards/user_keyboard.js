const PlanModel = require("../../models/Plan");

const stateList = require("../stateList");

const { all_buttons_text } = require("../../buttons/all_buttons_text");

const {
  asking_question_guide,
  pro_students_register_message,
} = require("../../messages/student_messages");
const {
  please_enter_the_requested_information_message,
  enter_full_name_message,
} = require("../../messages/similar_messages");
const {
  cancel_button,
} = require("../../buttons/similar_buttons/cancel_button");
const {
  register_buttons,
} = require("../../buttons/user_buttons/register_buttons");
const {
  plans_buttons,
} = require("../../buttons/similar_buttons/plans_buttons");
const { select_an_item_message } = require("../../messages/similar_messages");
const { no_plan_found_message } = require("../../messages/admin_messages");



module.exports = {
  [all_buttons_text.ask_question]: async (ctx) => {
    ctx.session.state = stateList.getStudentFullName;
    await ctx.reply(asking_question_guide);
    await ctx.reply(enter_full_name_message, cancel_button);
  },
  [all_buttons_text.register]: async (ctx) => {
    ctx.reply(select_an_item_message, register_buttons);
  },
  [all_buttons_text.register_as_pro_students]: async (ctx) => {
    ctx.session = undefined;
    const plansData = await PlanModel.find();
    if (plansData.length !== 0) {
      const tempMessage = await ctx.reply(
        pro_students_register_message,
        plans_buttons(plansData)
      );
      ctx.session.chatId = tempMessage.chat.id;
      ctx.session.messageId = tempMessage.message_id;
    } else ctx.reply(no_plan_found_message);
  },
  [all_buttons_text.register_as_adviser]: async (ctx) => {
    ctx.session = undefined;
    await ctx.reply(please_enter_the_requested_information_message);
    ctx.session.state = stateList.getAdviserFullNameForRegister;
    ctx.reply(enter_full_name_message, cancel_button);
  },
};
