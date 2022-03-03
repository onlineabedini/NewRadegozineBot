const {all_buttons_text} = require("../all_buttons_text");

module.exports.enter_level_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: all_buttons_text.genius},
                {text: all_buttons_text.high},
                {text: all_buttons_text.medium},
                {text: all_buttons_text.low},
            ],
            [{text: all_buttons_text.cancel}],
        ],
    },
};

