const {all_buttons_text} = require("../all_keyborad_text");

module.exports.skip_from_this_step_buttons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text:all_buttons_text.skip_from_this_step }],
            [{text:all_buttons_text.cancel }],
        ],
    },
};