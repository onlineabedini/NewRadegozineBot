const AdviserService = require('./AdviserService')

const {
    mainButtonsText,
} = require("../../../buttons/ButtonManager");

module.exports = {
    [mainButtonsText.sendMessageForAdmins]: AdviserService.sendMessageForAdmins,
    [mainButtonsText.getStudentsQuestionsList]: AdviserService.getStudentsQuestionsList,
}