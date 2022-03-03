const { all_buttons_text } = require("../all_buttons_text");

module.exports.messages_list_buttons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: all_buttons_text.show_users_questions_list }],
      [{ text: all_buttons_text.show_advisers_questions_list }],
      [{ text: all_buttons_text.back }],
    ],
  },
};
