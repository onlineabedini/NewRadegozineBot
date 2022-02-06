// import botDevelopers button text
const {botDevelopersButtonText} = require('../similarButtons/botDevelopersButtonText')

//buttons text
adviserStartButtonsText = {
    sendMessageForAdmins: "📤  ارسال پیام برای مدیران",
    getStudentsQuestionsList: "📥  لیست سوالات دانش آموزان",
}

//buttons reply
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