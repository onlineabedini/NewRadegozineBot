const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    type: {
        type: String,
    },
    channelChatId: {
        type: "Number",
    },
    channelUserName: {
        type: String,
    },
    channelTitle: {
        type: String,
    },
});

module.exports = mongoose.model('ChannelModel', schema);
