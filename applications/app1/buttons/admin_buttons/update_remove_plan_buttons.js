module.exports.update_and_remove_plan_buttons = (id) => {
    return {
        resize_keyboard: true,
        inline_keyboard: [
            [{text: "❌ حذف این طرح ❌", callback_data: `REMOVE_PLAN_${id}`}],
            [{text: "🔄 ویرایش این طرح 🔄", callback_data: `UPDATE_PLAN_${id}`}],
        ],
    }
}
