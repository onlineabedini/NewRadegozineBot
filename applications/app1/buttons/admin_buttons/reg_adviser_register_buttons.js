module.exports.reg_adviser_register_buttons = (id) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [
                [{text: "✅ پذیرش این مشاور ✅", callback_data: `ACC_ADVISER_${id}`}],
                [{text: "🚫 نپذیرفتن مشاور 🚫", callback_data: `REJ_ADVISER_${id}`}],
            ],
        }
    };
}