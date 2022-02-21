module.exports.update_remove_student_buttons = (id) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [
                [{text: "❌ حذف این دانش آموز ❌", callback_data: `REMOVE_STUDENT_${id}`}],
                [{text: "🔄 ویرایش اطلاعات دانش آموز 🔄", callback_data: `UPDATE_STUDENT_${id}`}],
            ],
        }
    }
};