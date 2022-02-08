const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userRole: {default: "adviser", type: String},
    userChatId: {type: Number},
    userName: {type: String},
    userFullName: {type: String},
    messagesIds: [],
});
module.exports = mongoose.model("AdviserModel", schema);
