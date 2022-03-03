const {all_buttons_text} = require("../all_buttons_text");

module.exports.enter_field_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: all_buttons_text.ensani},
                {text: all_buttons_text.tajrobi},
                {text: all_buttons_text.riyazi},
            ],
            [
                {text: all_buttons_text.other_fields},
                {text: all_buttons_text.zaban},
                {text: all_buttons_text.honar},
            ],
            [{text: all_buttons_text.cancel}],
        ],
    },
};

