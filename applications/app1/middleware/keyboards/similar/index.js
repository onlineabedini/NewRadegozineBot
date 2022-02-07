//import SimilarService class
const SimilarService = require('./SimilarService');

//import buttons text
const {cancelButtonText} = require("../../../buttons/similarButtons/cancelButton");
const { backButtonText } = require("../../../buttons/similarButtons/backButton");
const {botDevelopersButtonText} = require("../../../buttons/similarButtons/botDevelopersButtonText");

module.exports = {
    [cancelButtonText.cancel]: SimilarService.cancel,
    [ backButtonText.back ]: SimilarService.back,
    [botDevelopersButtonText.botDevelopers]: SimilarService.botDevelopersInfo,
}
