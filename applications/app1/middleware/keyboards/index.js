//import our objects and services
const admin_keyboards = require("./admin_keyboards");
const adviser_keyboards = require("./adviser_keyboards");
const student_keyboards = require("./student_keyboards");
const user_keyboards = require("./user_keyboard");
const similar_keyboards = require("./similar_keyboards");

const { all_buttons_text } = require("../../buttons/all_buttons_text");

module.exports = (ctx, next) => {
  if (!ctx.message) return next();
  const text = ctx.message.text;
  if (text)
    if (Object.values(all_buttons_text).includes(text) && EventListener[text]) {
      return EventListener[text](ctx);
    }
  next();
};

EventListener = {
  ...admin_keyboards,
  ...adviser_keyboards,
  ...student_keyboards,
  ...user_keyboards,
  ...similar_keyboards,
};
