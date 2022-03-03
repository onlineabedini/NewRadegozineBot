const { all_buttons_text } = require("../all_buttons_text");

module.exports.admin_start_buttons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [
        { text: all_buttons_text.manage_advisers },
        { text: all_buttons_text.manage_admins },
      ],
      [
        { text: all_buttons_text.manage_plans },
        { text: all_buttons_text.manage_pro_students },
      ],
      [
        { text: all_buttons_text.manage_content_production },
        { text: all_buttons_text.manage_messages },
      ],
      [
        { text: all_buttons_text.bot_developers },
        { text: all_buttons_text.bot_statistics },
      ],
    ],
  },
};
