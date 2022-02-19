const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userRole: { default: "student", type: String },
  userChatId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userFullName: {
    type: String,
  },
  userField: {
    type: String,
  },
  userGrade: {
    type: String,
  },
  userMessageId: {
    type: String,
  },
  userMessageText: {
    type: "String",
  },
});
module.exports = mongoose.model("StudentModel", schema);
