//import AdviserService class
const AdviserService = require('../adviser/AdviserService');

//import stateList
const stateList = require('../../stateList')

module.exports = {
    [stateList.sendMessageForAdmins]: AdviserService.sendMessageForAdmins,
};
