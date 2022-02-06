const AdviserService = require('./AdviserService')
const { adviserStartButtonsText } = require("../../../buttons/adviserButtons/adviserStartButtons");

module.exports = {
    [adviserStartButtonsText.sendMessageForAdmins]: AdviserService.sendMessageForAdmins,
    [adviserStartButtonsText.getStudentsQuestionsList]: AdviserService.getStudentsQuestionsList,
}