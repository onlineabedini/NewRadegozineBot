module.exports.update_and_remove_content_buttons = (id) => {
    return {
        resize_keyboard: true,
        inline_keyboard: [
            [{text: "❌ حذف این عنوان ❌", callback_data: `REMOVE_CONTENT_${id}`}],
            [{text: "🔄 ویرایش این عنوان 🔄", callback_data: `UPDATE_CONTENT_${id}`}],
        ],
    }

}
