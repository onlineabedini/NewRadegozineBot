//import our objects and services
const manage_admins = require("./manage_admins");
const manage_advisers = require("./manage_advisers");
const manage_pro_student = require("./manage_pro_student");
const manage_messages = require("./manage_messages");
const manage_plans = require("./manage_plans");
const manage_content = require("./manage_content");
const bot_statistics = require("./bot_statistics");
const register = require("./register");
const ask_question = require("./ask_question");
const questions_list = require("./questions_list");
const send_content = require("./send_content");
const pro_student_info = require("./pro_student_info");
const back = require("./back");
const cancel = require("./cancel");
const show_plan = require("./show_plan");
const contact = require("./contact");
const bot_developers = require("./bot_developers");

const { all_buttons_text } = require("../../buttons/all_buttons_text");

module.exports = (ctx, next) => {
  if (!ctx.message) return next();
  const text = ctx.message.text;
  if (text)
    if (Object.values(all_buttons_text).includes(text) && event_listener[text]) {
      return event_listener[text](ctx);
    }
  next();
};

event_listener = {
  ...manage_admins,
  ...manage_advisers,
  ...manage_pro_student,
  ...manage_messages,
  ...manage_plans,
  ...manage_content,
  ...bot_statistics,
  ...register,
  ...ask_question,
  ...questions_list,
  ...send_content,
  ...pro_student_info,
  ...back,
  ...cancel,
  ...show_plan,
  ...contact,
  ...bot_developers
};
