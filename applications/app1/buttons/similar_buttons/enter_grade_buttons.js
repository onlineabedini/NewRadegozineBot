const {all_buttons_text} = require("../all_buttons_text");

module.exports.enter_grade_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: all_buttons_text.twelfth},
                {text: all_buttons_text.eleventh},
                {text: all_buttons_text.tenth},
            ],
            [{text: all_buttons_text.cancel}],
        ],
    },
};

