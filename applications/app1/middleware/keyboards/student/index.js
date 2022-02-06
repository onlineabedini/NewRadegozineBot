//import StudentService class
const StudentService = require('./StudentService');

//import buttons text
const {studentStartButtonsText} = require("../../../buttons/studentButtons/studentStartButtons");

module.exports = {
    [studentStartButtonsText.askQuestion]: StudentService.askQuestion,
    [studentStartButtonsText.showPlans]: StudentService.showPlans,
    [studentStartButtonsText.contactWithAdmin]: StudentService.contactWithAdmin,
}