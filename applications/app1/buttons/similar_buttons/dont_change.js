const {all_buttons_text} = require("../all_buttons_text");

module.exports.dont_change = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text:all_buttons_text.dont_change }],
            [{text:all_buttons_text.cancel }],
        ],
    },
};