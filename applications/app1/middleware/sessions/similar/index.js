//import AdviserService class
const SimilarService = require('../similar/SimilarService');

//import stateList
const stateList = require('../../stateList')

module.exports = {
    [stateList.answer]: SimilarService.answer,
    [stateList.removeQuestion]: SimilarService.removeQuestion,
    [stateList.getFieldForSendContent]: SimilarService.getFieldForSendContent,
    [stateList.getGradeForSendContent]: SimilarService.getGradeForSendContent,
    [stateList.getLevelForSendContent]: SimilarService.getLevelForSendContent,
    [stateList.sendContentForProStudents]: SimilarService.sendContentForProStudents,
    [stateList.sendContentForAllStudents]: SimilarService.sendContentForAllStudents,
};
