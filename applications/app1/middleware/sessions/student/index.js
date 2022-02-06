//import StudentService class
const StudentService = require('./StudentService')

//import stateList
const stateList = require('../../stateList')

module.exports = {
    [stateList.getStudentFullName]: StudentService.getStudentFullName,
    [stateList.getStudentField]: StudentService.getStudentField,
    [stateList.getStudentGrade]: StudentService.getStudentGrade,
    [stateList.askQuestion]: StudentService.askQuestion,
};
