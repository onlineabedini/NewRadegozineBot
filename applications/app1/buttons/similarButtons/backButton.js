//buttons text
backButtonText = {
    back: "↩️  بازگشت"
}

//buttons reply
const backButton = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{text: backButtonText.back}]],
    },
};

module.exports = {
    backButtonText, backButton,
};
