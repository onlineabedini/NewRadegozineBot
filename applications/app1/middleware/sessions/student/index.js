const StudentService = require('./StudentService')
const stateList = require('../../stateList')

module.exports = {
  [stateList.GETSTUDENTFULLNAME]: StudentService.getStudentFullName,
  [stateList.GETSTUDENTFIELD]: StudentService.getStudentField,
  [stateList.GETSTUDENTGRADE]: StudentService.getStudentGrade ,
  [stateList.ASKQUESTION]: StudentService.askQuestion,
};
