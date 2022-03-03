module.exports.pro_student_register_buttons = (id) => {
  return {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: "✅ تایید دانش آموز برای ردگزینه پرو  ✅", callback_data: `ACC_${id}` }],
      [{ text: "☑️ تایید دانش آموز بدون عضویت در رد گزینه پرو ☑️", callback_data: `DEL_${id}` }],
      [{ text: "🚫 نپذیرفتن دانش آموز 🚫", callback_data: `REJ_${id}` }],
      [{ text: "📧 ارسال پیام برای دانش آموز 📧", callback_data: `SENDMSG_${id}` }],
    ],
  };
};
