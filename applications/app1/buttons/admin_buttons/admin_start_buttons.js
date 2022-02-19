const {all_buttons_text} = require("../all_keyborad_text");

module.exports.admin_start_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: all_buttons_text.manage_advisers},
                {text: all_buttons_text.manage_admins},
            ],
            [
                {text: all_buttons_text.manage_plans},
                {text: all_buttons_text.manage_pro_students},
            ],
            [
                {text: all_buttons_text.send_message_for_users},
                {text: all_buttons_text.send_message_for_advisers},
            ],
            [
                {text: all_buttons_text.show_users_questions_list},
                {text: all_buttons_text.show_advisers_questions_list},
            ],
            [
                {text: all_buttons_text.bot_developers},
            ],
        ],
    },
};


