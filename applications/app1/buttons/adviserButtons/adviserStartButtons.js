const {botDevelopersButtonText} = require('../similarButtons/botDevelopersButtonText')

adviserStartButtonsText = {
    sendMessageForAdmins: "📤  ارسال پیام برای مدیران",
    getStudentsQuestionsList: "📥  لیست سوالات دانش آموزان",
}

const adviserStartButtons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{text: adviserStartButtonsText.getStudentsQuestionsList}],
            [{text: adviserStartButtonsText.sendMessageForAdmins}],
            [{text: botDevelopersButtonText.botDevelopers}],
        ],
    },
};

module.exports = {
    adviserStartButtonsText,
    adviserStartButtons,
}