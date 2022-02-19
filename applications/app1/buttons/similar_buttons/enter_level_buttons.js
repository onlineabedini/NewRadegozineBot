const {all_buttons_text} = require("../all_keyborad_text");

module.exports.enter_level_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: all_buttons_text.level_D},
                {text: all_buttons_text.level_C},
                {text: all_buttons_text.level_B},
                {text: all_buttons_text.level_A},
            ],
            [{text: all_buttons_text.cancel}],
        ],
    },
};

