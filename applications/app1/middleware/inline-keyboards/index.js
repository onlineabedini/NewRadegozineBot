const adminInlineKeyboard = require('./admin')
const adviserInlineKeyboard = require('./adviser')
const studentInlineKeyboard = require('./student')

const ActionMap = {
  ANSWER: /^ANSWER/,
  DELETE: /^DELETE/,
  YES: /^YES/,
  NO: /^NO/,
  CANCEL: /^CANCEL/,
};

module.exports = (ctx, next) => {
  if (!ctx.update.callback_query) return next();
  const callback_data = ctx.update.callback_query.data;
  if (callback_data) {
    const actionValues = Object.values(ActionMap);
    for (let i = 0; i < actionValues.length; i++) {
      const isMatch = callback_data.match(actionValues[i]);
      if (isMatch && EventListener[Object.keys(ActionMap)[i]])
        return EventListener[Object.keys(ActionMap)[i]](ctx, isMatch);
    }
  }
  next();
};

const EventListener = {
  ...adminInlineKeyboard,
  ...adviserInlineKeyboard,
  ...studentInlineKeyboard,
};
