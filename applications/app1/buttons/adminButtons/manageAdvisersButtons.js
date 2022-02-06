//import back button text
const {backButtonText} = require('../similarButtons/backButton')

//buttons text
manageAdvisersButtonsText = {
    addAdviser: "➕  افزودن مشاور",
    removeAdviser: "❌  حذف مشاور",
    addAdviserCancel: "❌        لغو افزودن مشاور        ❌",
    removeAdviserCancel: "❌        لغو حذف مشاور        ❌",
    getAdvisersList: "🗣  نمایش لیست مشاوران",
}

//buttons reply
const manageAdvisersButtons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: manageAdvisersButtonsText.getAdvisersList}],
            [
                {text: manageAdvisersButtonsText.removeAdviser},
                {text: manageAdvisersButtonsText.addAdviser},
            ],
            [{text: backButtonText.back}],
        ],
    },
};

const addAdviserCancelButton = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{text: manageAdvisersButtonsText.addAdviserCancel}]],
    },
};

const removeAdviserCancelButton = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{text: manageAdvisersButtonsText.removeAdviserCancel}]],
    },
};

module.exports = {
    manageAdvisersButtonsText,
    manageAdvisersButtons,
    addAdviserCancelButton,
    removeAdviserCancelButton,
}