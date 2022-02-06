const {botDevelopersButtonText} = require('../similarButtons/botDevelopersButtonText')

// buttons text
adminStartButtonsText = {
    manageAdmins: "👤  مدیریت مدیران",
    manageAdvisers: "🗣  مدیریت مشاوران",
    getStudentsQuestionsListForAdmins: "📥  نمایش لیست سوالات دانش آموزان",
    getAdvisersQuestionsList: "📥  پیام های مشاوران",
    sendMessageForStudents: "📤  ارسال پیام برای دانش آموزان",
    sendMessageForAdvisers: "📤  ارسال پیام برای مشاوران",
};


// buttons reply
const adminStartButtons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: adminStartButtonsText.manageAdvisers},
                {text: adminStartButtonsText.manageAdmins},
            ],
            [
                {text: adminStartButtonsText.sendMessageForStudents},
                {text: adminStartButtonsText.sendMessageForAdvisers},
            ],
            [
                {text: adminStartButtonsText.getStudentsQuestionsListForAdmins},
                {text: adminStartButtonsText.getAdvisersQuestionsList},
            ],
            [{text: botDevelopersButtonText.botDevelopers}],
        ],
    },
};

module.exports = {
    adminStartButtonsText,
    adminStartButtons
}