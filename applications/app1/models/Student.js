const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    userRole: {default: "student", type: String},
    userChatId: {
        type: "Number",
    },
    userName: {
        type: "String",
    },
    userFullName: {
        type: "String",
    },
    userField: {
        type: "String",
    },
    userGrade: {
        type: "String",
    },
    userMessageId: {
        type: "Number",
    },
    userMessageText: {
        type: "String",
    },
});
module.exports = mongoose.model("StudentModel", schema);
