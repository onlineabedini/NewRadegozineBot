const {all_buttons_text} = require("../all_keyborad_text");

module.exports.manage_pro_students_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.send_content_for_students}],
            [{text: all_buttons_text.showlist_update_remove_students}, {text: all_buttons_text.add_student}],
            [{text: all_buttons_text.back}],
        ],
    },
};

