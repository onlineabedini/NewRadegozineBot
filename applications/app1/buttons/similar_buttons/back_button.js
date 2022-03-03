const {all_buttons_text} = require("../all_buttons_text");

module.exports.back_button = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{text: all_buttons_text.back}]],
    },
};
