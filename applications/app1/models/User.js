const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    userRole: {default: "user", type: String},
    userId: {
        type: String,
    },
    userChatId: {
        type: String,
    },
    userName: {
        type: String,
    },
    userFirstName: {
        type: String,
    },
    userLastName: {
        type: String,
    },
});
module.exports = mongoose.model("UserModel", schema);
