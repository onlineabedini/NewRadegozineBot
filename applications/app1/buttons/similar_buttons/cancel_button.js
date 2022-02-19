const {all_buttons_text} = require("../all_keyborad_text");

module.exports.cancel_button = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{text: all_buttons_text.cancel}]],
    },
};


