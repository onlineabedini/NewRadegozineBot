// import AdviserService class
const AdviserService = require('./AdviserService')

//import buttons text
const { adviserStartButtonsText } = require("../../../buttons/adviserButtons/adviserStartButtons");

module.exports = {
    [adviserStartButtonsText.sendMessageForAdmins]: AdviserService.sendMessageForAdmins,
    [adviserStartButtonsText.getStudentsQuestionsList]: AdviserService.getStudentsQuestionsList,
}