const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    user_role: {default: "user", type: String}, userId: {
        type: String,
    },
    chat_id: {
        type: String,
    },
    username: {
        type: String,
    }
    , first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
});
module.exports = mongoose.model("UserModel", schema);
