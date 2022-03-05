const {all_buttons_text} = require("../all_buttons_text");

module.exports.manage_admins_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: all_buttons_text.show_admins_list}],
            [{text: all_buttons_text.add_admin},],
            [{text: all_buttons_text.remove_admin}],
            [{text: all_buttons_text.back}],
        ],
    },
};
