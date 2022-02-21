const {all_buttons_text} = require("../all_keyborad_text");

module.exports.accept_discard_buttons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: all_buttons_text.accept }],
      [{ text: all_buttons_text.discard }],
    ],
  },
};

