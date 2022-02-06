const adminKeyboards = require('./admin')
const adviserKeyboards = require('./adviser')
const studentKeyboards = require('./student')
const similarKeyboards = require('./similar')

const { adminStartButtonsText } = require('../../buttons/adminButtons/adminStartButtons')
const { manageAdminsButtonsText } = require('../../buttons/adminButtons/manageAdminsButtons')
const { manageAdvisersButtonsText } = require('../../buttons/adminButtons/manageAdvisersButtons')
const { adviserStartButtonsText } = require('../../buttons/adviserButtons/adviserStartButtons')
const { studentStartButtonsText } = require('../../buttons/studentButtons/studentStartButtons')
const { backButtonText } = require('../../buttons/similarButtons/backButton')
const { cancelButtonText } = require('../../buttons/similarButtons/cancelButton')
const { botDevelopersButtonText } = require('../../buttons/similarButtons/botDevelopersButtonText')

const mainButtonsText = {
  ...adminStartButtonsText,
  ...manageAdminsButtonsText,
  ...manageAdvisersButtonsText,
  ...adviserStartButtonsText,
  ...studentStartButtonsText,
  ...backButtonText,
  ...cancelButtonText,
  ...botDevelopersButtonText
}

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
  ...similarKeyboards
};
