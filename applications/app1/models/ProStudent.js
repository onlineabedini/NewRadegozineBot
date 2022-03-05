const mongoose = require("mongoose");
const {all_buttons_text} = require("../buttons/all_buttons_text");

const schema = new mongoose.Schema({
    plan_id: {
        type: String,
    },
    fullname: {
        type: String,
    },
    field: {
        type: String,
    },
    grade: {
        type: String,
    },
    level: {
        type: String, default: all_buttons_text.low,
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
    },
    whats_up_number: {
        type: String,
    },
    city: {
        type: String,
    },
    chat_id: {
        type: String,
    },
    username: {
        type: String,
    },
    message_id: {
        type: String,
    },
    message_text: {
        type: String,
    },
    payment_picture: {
        type: String,
    },
    user_role: {
        type: String, default: "Normal",
    },
    is_pro: {
        type: Boolean, default: false,
    },
});

module.exports = mongoose.model("ProStudentModel", schema);
