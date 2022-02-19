//import our objects and services
const adminKeyboards = require("./admin");
const adviserKeyboards = require("./adviser");
const studentKeyboards = require("./student");
const userKeyboards = require("./user");
const similarKeyboards = require("./similar");

const {all_buttons_text} = require("../../buttons/all_keyborad_text");

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
    ...adminKeyboards,
    ...adviserKeyboards,
    ...studentKeyboards,
    ...userKeyboards,
    ...similarKeyboards,
};
