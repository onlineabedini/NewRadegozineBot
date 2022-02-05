const adminKeyboards = require('./admin')
const adviserKeyboards = require('./adviser')
const studentKeyboards = require('./student')
const sameKeyboards = require('./same')

const {
  mainButtonsText,
} = require("../../buttons/ButtonManager");

module.exports = (ctx, next) => {
  if (!ctx.message) return next();
  const text = ctx.message.text;
  if (text)
    if (
      Object.values(mainButtonsText).includes(text) &&
      EventListener[text]
    ) {
      return EventListener[text](ctx);
    }
  next();
};

EventListener = {
  ...adminKeyboards,
  ...adviserKeyboards,
  ...studentKeyboards,
  ...sameKeyboards
};

