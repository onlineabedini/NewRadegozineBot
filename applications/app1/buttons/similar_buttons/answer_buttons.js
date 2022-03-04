// inline keyboards
module.exports.answer_buttons = (id) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [
                [{text: `⏺  پاسخ به این سوال`, callback_data: `ANSWER_QUESTION_${id}`}],
                [{text: `🗑  حذف این سوال`, callback_data: `DELETE_QUESTION_${id}`}],
            ],
        },
    }
};




