module.exports.send_pay_pic_button = (id) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [[{text: "ارسال رسید برای مدیر", callback_data: `SEND_PAYMENT_PICTURE_${id}`}]]
        }
    }
}