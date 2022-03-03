const { all_buttons_text } = require("../all_buttons_text");

module.exports.manage_advisers_buttons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [
        { text: all_buttons_text.show_reg_advisers_list },
        { text: all_buttons_text.show_advisers_list },
      ],
      [
        { text: all_buttons_text.remove_adviser },
        { text: all_buttons_text.add_adviser },
      ],
      [
        { text: all_buttons_text.demote_adviser },
        { text: all_buttons_text.promote_adviser },
      ],
      [{ text: all_buttons_text.back }],
    ],
  },
};
