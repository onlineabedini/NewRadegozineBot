const StudentService = require('./StudentService');

const {
    mainButtonsText,
} = require("../../../buttons/ButtonManager");

module.exports = {
    [mainButtonsText.askQuestion]: StudentService.askQuestion,
    [mainButtonsText.showPlans]: StudentService.showPlans,
    [mainButtonsText.contactWithAdmin]: StudentService.contactWithAdmin,
}