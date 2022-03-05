const {all_buttons_text} = require("../all_buttons_text");

module.exports.manage_messages_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.send_message}],
            [{text: all_buttons_text.messages_list}],
            [{text: all_buttons_text.back}],
        ],
    },
};
