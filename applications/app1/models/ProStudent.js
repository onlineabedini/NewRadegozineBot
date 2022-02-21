const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userPlanId: {
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
  userLevel: {
    type: String,
  },
  userPhoneNumber: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userWhatsUpNumber: {
    type: String,
  },
  userCity: {
    type: String,
  },
  userChatId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userMessageId: {
    type: String,
  },
  userMessageText: {
    type: String,
  },
  userPaymentPicture: {
    type: String,
  },
  userRole: {
    type: String,
    default: "Normal",
  },
  isPro: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("ProStudentModel", schema);
