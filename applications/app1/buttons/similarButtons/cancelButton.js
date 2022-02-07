//buttons text
cancelButtonText = {
    cancel: "❌        لغو        ❌"
}

//buttons reply
const cancelButton = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{text: cancelButtonText.cancel}]],
    },
};

module.exports = {
    cancelButtonText,
    cancelButton
}

