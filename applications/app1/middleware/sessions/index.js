//import our objects and services
const adminSessions = require("./admin");
const adviserSessions = require("./adviser");
const studentSessions = require("./student");
const stateList = require("../stateList");

module.exports = (ctx, next) => {
  if (!ctx.session.state) return next();
  const state = ctx.session.state;
  const values = Object.values(stateList);
  if (values.includes(state) && EventListener[state])
    return EventListener[state](ctx, next);
  next();
};

const EventListener = {
  ...adminSessions,
  ...adviserSessions,
  ...studentSessions,
};

