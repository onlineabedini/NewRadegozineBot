const {all_buttons_text} = require("../all_buttons_text");

module.exports.content_production_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.add_content_title}],
            [{text: all_buttons_text.show_update_remove_content}],
            [{text: all_buttons_text.back}],
        ],
    },
};

