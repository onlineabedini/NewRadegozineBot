const manage_admins = require("./manage_admins");
const manage_advisers = require("./manage_advisers");
const manage_pro_student = require("./manage_pro_student");
const manage_question = require("./manage_question");
const manage_plans = require("./manage_plans");
const manage_contents = require("./manage_contents");
const register_as_pro_student = require("./register_as_pro_student");
const register_as_adviser = require("./register_as_adviser");
const send_message = require("./send_message");
const send_content = require("./send_content");

const state_list = require("../state_list");

module.exports = (ctx, next) => {
  if (!ctx.session?.state) return next();
  const state = ctx.session.state;
  const values = Object.values(state_list);
  if (values.includes(state) && EventListener[state])
    return EventListener[state](ctx, next);
  return next();
};

const EventListener = {
  ...manage_admins,
  ...manage_advisers,
  ...manage_pro_student,
  ...manage_plans,
  ...manage_contents,
  ...register_as_pro_student,
  ...register_as_adviser,
  ...manage_question,
  ...send_content,
  ...send_message,
};
