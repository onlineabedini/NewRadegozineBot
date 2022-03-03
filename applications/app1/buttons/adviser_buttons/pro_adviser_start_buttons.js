const {all_buttons_text} = require("../all_buttons_text");

module.exports.pro_adviser_start_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.show_users_questions_list}],
            [
                {text: all_buttons_text.send_message_for_admins},
                {text: all_buttons_text.send_content_for_students}
            ],
            [{text: all_buttons_text.bot_developers}],
        ],
    },
};
