const {all_buttons_text} = require("../all_keyborad_text");

module.exports.student_start_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.ask_question_from_pro_adviser}],
            [
                {text: all_buttons_text.my_info},
                {text: all_buttons_text.ask_question}
            ],
            [
                {text: all_buttons_text.contact_with_developer},
                {text: all_buttons_text.contact_with_admin},
            ],
            [{text: all_buttons_text.bot_developers},]
        ],
    },
};

