const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userRole: { default: "admin", type: String },
    userName: {type: String},
    userFullName: {type: String},
});

module.exports = mongoose.model("AdminModel", schema);
