const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userFullName: { type: String },
  userField: { type: String },
  userUniversity: { type: String },
  userDescription: { type: String },
  userPhoneNumber: { type: String },
  userEmail: { type: String },
  userCity: { type: String },
  userChatId: { type: String },
  userName: { type: String },
  isPro: { default: false, type: Boolean },
  isAccepted: { default: false, type: Boolean },
  IsRegistered: { default: false, type: Boolean },
  messagesIds: [],
});
module.exports = mongoose.model("AdviserModel", schema);
