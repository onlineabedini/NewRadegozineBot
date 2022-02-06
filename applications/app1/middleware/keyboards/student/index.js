const StudentService = require('./StudentService');
const {studentStartButtonsText} = require("../../../buttons/studentButtons/studentStartButtons");

module.exports = {
    [studentStartButtonsText.askQuestion]: StudentService.askQuestion,
    [studentStartButtonsText.showPlans]: StudentService.showPlans,
    [studentStartButtonsText.contactWithAdmin]: StudentService.contactWithAdmin,
}