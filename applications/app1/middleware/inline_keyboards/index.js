const accept_accept_and_remove_reject_remove_student = require("./accept_accept_and_remove_reject_remove_student");
const update_remove_student = require("./update_remove_student");
const accept_reject_adviser = require("./accept_reject_adviser");
const update_remove_plan = require("./update_remove_plan");
const update_remove_content = require("./update_remove_content");
const answer_delete_question = require("./answer_delete_question");
const send_message_for_student = require("./send_message_for_student");
const send_payment_pictures = require("./send_payment_pictures");
const plans = require("./plans");


const action_map = {
    ACCEPT_AND_REMOVE: /^ACCEPT_AND_REMOVE_\w+/,
    ACCEPT_STUDENT: /^ACCEPT_STUDENT_\w+/,
    REJECT_STUDENT: /^REJECT_STUDENT_\w+/,
    SEND_MESSAGE: /^SEND_MESSAGE_\w+/,

    UPDATE_STUDENT: /^UPDATE_STUDENT_\w+/,
    REMOVE_STUDENT: /^REMOVE_STUDENT_\w+/,

    ACCEPT_ADVISER: /^ACCEPT_ADVISER_\w+/,
    REJECT_ADVISER: /^REJECT_ADVISER_\w+/,

    UPDATE_CONTENT: /^UPDATE_CONTENT_\w+/,
    REMOVE_CONTENT: /^REMOVE_CONTENT_\w+/,

    UPDATE_PLAN: /^UPDATE_PLAN_\w+/,
    REMOVE_PLAN: /^REMOVE_PLAN_\w+/,

    ANSWER_QUESTION: /^ANSWER_QUESTION_\w+/,
    DELETE_QUESTION: /^DELETE_QUESTION_\w+/,
    TAG_PERSON: /^TAG_PERSON_\w+/,

    PLAN: /^PLAN_\w+/,

    SEND_PAYMENT_PICTURE: /^SEND_PAYMENT_PICTURE_\w+/,
};

module.exports = (ctx, next) => {
    if (!ctx.update.callback_query) return next();
    const callback_data = ctx.update.callback_query.data;
    if (callback_data) {
        const action_values = Object.values(action_map);
        for (let i = 0; i < action_values.length; i++) {
            const is_match = callback_data.match(action_values[i]);
            if (is_match && event_listener[Object.keys(action_map)[i]])
                return event_listener[Object.keys(action_map)[i]](ctx, is_match);
        }
    }
    next();
};

const event_listener = {
    ...accept_accept_and_remove_reject_remove_student,
    ...update_remove_student,
    ...accept_reject_adviser,
    ...update_remove_plan,
    ...update_remove_content,
    ...answer_delete_question,
    ...send_message_for_student,
    ...send_payment_pictures,
    ...plans,
};
