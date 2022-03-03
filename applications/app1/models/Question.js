const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    user_role: {default: "student", type: String}, chat_id: {
        type: String,
    }, username: {
        type: String,
    }, fullname: {
        type: String,
    }, field: {
        type: String,
    }, grade: {
        type: String,
    }, message_id: {
        type: String,
    }, message_text: {
        type: "String",
    },
});
module.exports = mongoose.model("QuestionModel", schema);
