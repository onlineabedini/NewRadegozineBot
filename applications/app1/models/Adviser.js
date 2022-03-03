const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    fullname: {type: String},
    field: {type: String},
    university: {type: String},
    description: {type: String},
    phone_number: {type: String},
    email: {type: String},
    city: {type: String},
    chat_id: {type: String},
    username: {type: String},
    is_pro: {default: false, type: Boolean},
    is_accepted: {default: false, type: Boolean},
    is_registered: {default: false, type: Boolean},
    messagesIds: [],
});
module.exports = mongoose.model("AdviserModel", schema);
