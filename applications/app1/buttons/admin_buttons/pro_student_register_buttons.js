module.exports.pro_student_register_buttons = (id) => {
  return {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: "✅ تایید دانش آموز برای ردگزینه پرو  ✅", callback_data: `ACCEPT_STUDENT_${id}` }],
      [{ text: "☑️ تایید دانش آموز بدون عضویت در رد گزینه پرو ☑️", callback_data: `ACCEPT_AND_REMOVE_${id}` }],
      [{ text: "🚫 نپذیرفتن دانش آموز 🚫", callback_data: `REJECT_STUDENT_${id}` }],
      [{ text: "📧 ارسال پیام برای دانش آموز 📧", callback_data: `SEND_MESSAGE_${id}` }],
    ],
  };
};
