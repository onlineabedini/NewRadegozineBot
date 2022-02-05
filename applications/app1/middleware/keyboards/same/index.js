const SameService = require('./SameService');

const {
    mainButtonsText,
} = require("../../../buttons/ButtonManager");

module.exports = {
    [mainButtonsText.cancel]: SameService.cancel
    ,[mainButtonsText.botDevelopers]: SameService.botDevelopers
}