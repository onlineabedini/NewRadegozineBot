const {all_buttons_text} = require("../all_buttons_text");
module.exports.register_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.register_in_plans}],
            [{text: all_buttons_text.register_as_adviser}],
            [{text: all_buttons_text.back}],
        ],
    },
};


