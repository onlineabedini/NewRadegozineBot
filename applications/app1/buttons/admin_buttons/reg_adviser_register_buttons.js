module.exports.reg_adviser_register_buttons = (id) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        [{ text: "✅ پذیرش این مشاور ✅", callback_data: `ACCEPT_ADVISER_${id}` }],
        [{ text: "🚫 نپذیرفتن مشاور 🚫", callback_data: `REJECT_ADVISER_${id}` }],
      ],
    },
  };
};
