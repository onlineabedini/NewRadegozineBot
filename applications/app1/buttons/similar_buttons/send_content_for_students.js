const {all_buttons_text} = require("../all_keyborad_text");

module.exports.send_content_for_students = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.send_content_for_pro_students}],
            [{text: all_buttons_text.send_content_for_all_students}],
            [{text: all_buttons_text.back}],
        ],
    },
};
