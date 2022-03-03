const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user_role: {default: "admin", type: String},
    username: {type: String},
    chat_id: {type: String},
    fullname: {type: String},
});

module.exports = mongoose.model("AdminModel", schema);
