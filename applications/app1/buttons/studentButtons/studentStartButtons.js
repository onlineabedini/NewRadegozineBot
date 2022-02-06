const {botDevelopersButtonText} = require('../similarButtons/botDevelopersButtonText')

studentStartButtonsText = {
    askQuestion: "⁉️  سوال از مشاورین  ⁉️",
    showPlans: "🗂  طرح ها  🗂",
    contactWithAdmin: "👤  ارتباط با مدیر  👤",
}

const studentStartButtons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: studentStartButtonsText.askQuestion}],
            [
                {text: studentStartButtonsText.contactWithAdmin},
                {text: studentStartButtonsText.showPlans},
            ],
            [{text: botDevelopersButtonText.botDevelopers}],
        ],
    },
};

const showPlansButton = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{text: "مشاهده ی طرح ها", url: "https://t.me/radegozine_services"}],
        ],
    },
};

const contactWithAdminButton = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{text: "ارتباط با مدیر", url: "https://t.me/onlineabedini"}],
        ],
    },
};

module.exports = {
    studentStartButtonsText,
    studentStartButtons,
    showPlansButton,
    contactWithAdminButton
}