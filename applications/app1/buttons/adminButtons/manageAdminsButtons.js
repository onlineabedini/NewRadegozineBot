//import back button text
const {backButtonText} = require('../similarButtons/backButton')

//buttons text
manageAdminsButtonsText = {
    addAdmin: "➕  افزودن مدیر",
    removeAdmin: "❌  حذف مدیر",
    addAdminCancel: "❌        لغو افزودن مدیر        ❌",
    removeAdminCancel: "❌        لغو حذف مدیر        ❌",
    getAdminsList: "👤  نمایش لیست مدیران",
}

//buttons reply
const manageAdminsButtons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: manageAdminsButtonsText.getAdminsList}],
            [
                {text: manageAdminsButtonsText.removeAdmin},
                {text: manageAdminsButtonsText.addAdmin},
            ],
            [{text: backButtonText.back}],
        ],
    },
};

const addAdminCancelButton = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{text: manageAdminsButtonsText.addAdminCancel}]],
    },
};

const removeAdminCancelButton = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{text: manageAdminsButtonsText.removeAdminCancel}]],
    },
};


module.exports = {
    manageAdminsButtonsText,
    manageAdminsButtons,
    addAdminCancelButton,
    removeAdminCancelButton,
}