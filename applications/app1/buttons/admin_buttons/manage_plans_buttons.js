const { all_buttons_text } = require("../all_buttons_text");

module.exports.manage_plans_buttons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: all_buttons_text.add_plan }],
      [{ text: all_buttons_text.show_update_remove_plans }],
      [{ text: all_buttons_text.back }],
    ],
  },
};
