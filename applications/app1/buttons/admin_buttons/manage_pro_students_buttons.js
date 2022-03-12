const { all_buttons_text } = require("../all_buttons_text");

module.exports.manage_pro_students_buttons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: all_buttons_text.add_student }],
      [{ text: all_buttons_text.show_update_remove_students }],
      [{ text: all_buttons_text.not_payed_students }],
      [{ text: all_buttons_text.back }],
    ],
  },
};
