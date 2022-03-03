//import our objects and services
const adminSessions = require("./admin_sessions");
const adviserSessions = require("./adviser_sessions");
const userSessions = require("./user_sessions");
const proStudentSessions = require("./pro_student_sessions");
const similarSessions = require("./similar_sessions");

//import stateList
const stateList = require("../stateList");

module.exports = (ctx, next) => {
  if (!ctx.session?.state) return next();
  const state = ctx.session.state;
  const values = Object.values(stateList);
  if (values.includes(state) && EventListener[state])
    return EventListener[state](ctx, next);
  return next();
};

const EventListener = {
  ...adminSessions,
  ...adviserSessions,
  ...userSessions,
  ...proStudentSessions,
  ...similarSessions,
};
