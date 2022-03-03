const { all_buttons_text } = require("../all_buttons_text");

module.exports.send_message_buttons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: all_buttons_text.send_message_for_channels }],
      [{ text: all_buttons_text.send_message_for_users }],
      [{ text: all_buttons_text.send_message_for_advisers }],
      [{ text: all_buttons_text.back }],
    ],
  },
};
