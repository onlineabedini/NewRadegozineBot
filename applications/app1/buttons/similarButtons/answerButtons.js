// inline keyboards
const answerButtons = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{text: "پاسخ به سوال", callback_data: `ANSWER`}],
            [{text: "حذف سوال", callback_data: `DELETE`}],
        ],
    },
};

const answerCancelButton = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [[{text: "لغو", callback_data: "CANCEL"}]],
    },
};

const confidenceButtons = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {text: "خیر", callback_data: `NO`},
                {text: "بله", callback_data: `YES`},
            ],
        ],
    },
};

module.exports = {
    answerButtons,
    answerCancelButton,
    confidenceButtons
}