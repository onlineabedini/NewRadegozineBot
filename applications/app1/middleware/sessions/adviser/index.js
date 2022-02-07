//import AdviserService class
const AdviserController = require('../adviser/AdviserService');

//import stateList
const stateList = require('../../stateList')

module.exports = {
    [stateList.sendMessageForAdmins]: AdviserController.sendMessageForAdmins,
    [stateList.answer]: AdviserController.answer,
};
