const accept_accept_and_remove_reject_remove_student = require("./accept_accept_and_remove_reject_remove_student");
const update_remove_student = require("./update_remove_student");
const accept_reject_adviser = require("./accept_reject_adviser");
const update_remove_plan = require("./update_remove_plan");
const update_remove_content = require("./update_remove_content");
const answer_remove_question = require("./answer_remove_question");
const send_message_for_student = require("./send_message_for_student");
const send_payment_pictures = require("./send_payment_pictures");
const plans = require("./plans");


const ActionMap = {
    ANSWER: /^ANSWER_\w+/,
    DELETE: /^DELETE_\w+/,
    CANCEL: /^CANCEL/,
    UPDATE_STUDENT: /^UPDATE_STUDENT_\w+/,
    REMOVE_STUDENT: /^REMOVE_STUDENT_\w+/,
    UPDATE_CONTENT: /^UPDATE_CONTENT_\w+/,
    REMOVE_CONTENT: /^REMOVE_CONTENT_\w+/,
    UPDATE_PLAN: /^UPDATE_PLAN_\w+/,
    REMOVE_PLAN: /^REMOVE_PLAN_\w+/,
    ACC_ADVISER: /^ACC_ADVISER_\w+/,
    REJ_ADVISER: /^REJ_ADVISER_\w+/,
    PLAN: /^PLAN_\w+/,
    ACC: /^ACC_\w+/,
    REJ: /^REJ_\w+/,
    DEL: /^DEL_\w+/,
    SENDMSG: /^SENDMSG_\w+/,
    SENDPAYPIC: /^SENDPAYPIC_\w+/,
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
    ...accept_accept_and_remove_reject_remove_student,
    ...update_remove_student,
    ...accept_reject_adviser,
    ...update_remove_plan,
    ...update_remove_content,
    ...answer_remove_question,
    ...send_message_for_student,
    ...send_payment_pictures,
    ...plans,
};
