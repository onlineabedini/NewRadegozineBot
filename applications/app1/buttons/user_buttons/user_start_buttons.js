const {all_buttons_text} = require("../all_buttons_text");

module.exports.user_start_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.ask_question}],
            [
                {text: all_buttons_text.show_plans},
                {text: all_buttons_text.register},
            ],
            [
                {text: all_buttons_text.contact_with_developer},
                {text: all_buttons_text.contact_with_admin},
            ],
            [{text: all_buttons_text.bot_developers}],
        ],
    },
};



