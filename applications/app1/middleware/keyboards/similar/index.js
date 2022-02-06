const SimilarService = require('./SimilarService');
const {cancelButtonText} = require("../../../buttons/similarButtons/cancelButton");
const { backButtonText } = require("../../../buttons/similarButtons/backButton");
const {botDevelopersButtonText} = require("../../../buttons/similarButtons/botDevelopersButtonText");

module.exports = {
    [cancelButtonText.cancel]: SimilarService.cancel,
    [ backButtonText.back ]: SimilarService.back,
    [botDevelopersButtonText.botDevelopers]: SimilarService.botDevelopersInfo,
}
