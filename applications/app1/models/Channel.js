const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    type: {
        type: String,
    }, chat_id: {
        type: "Number",
    }, username: {
        type: String,
    }, title: {
        type: String,
    },
});

module.exports = mongoose.model("ChannelModel", schema);
