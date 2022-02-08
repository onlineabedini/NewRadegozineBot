//import AdviserService class
const SimilarService = require('../similar/SimilarService');

//import stateList
const stateList = require('../../stateList')

module.exports = {
    [stateList.answer]: SimilarService.answer,
};
