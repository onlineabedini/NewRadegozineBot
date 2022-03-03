const {all_buttons_text} = require("../all_buttons_text");
module.exports.info_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.show_my_info}],
            [{text: all_buttons_text.update_my_info}],
            [{text: all_buttons_text.back}],
        ],
    },
};