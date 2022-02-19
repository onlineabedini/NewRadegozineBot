const {all_buttons_text} = require("../all_keyborad_text");

module.exports.confidence_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text:all_buttons_text.no},
                {text: all_buttons_text.yes}
            ],
        ],
    },
}
