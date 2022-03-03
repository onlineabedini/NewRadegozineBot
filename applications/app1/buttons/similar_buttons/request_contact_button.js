const {all_buttons_text} = require("../all_buttons_text");

module.exports.request_contact_button = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: all_buttons_text.request_contact,
                    request_contact: true,
                },
            ],
            [{text: all_buttons_text.cancel}],
        ],
    },
};
