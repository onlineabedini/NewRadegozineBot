//import AdviserService class
const AdviserService = require('../adviser/AdviserService');

//import stateList
const stateList = require('../../stateList');

module.exports = {
    [stateList.sendMessageForAdmins]: AdviserService.sendMessageForAdmins,
    [stateList.getAdviserFullNameForRegister]: AdviserService.getAdviserFullNameForRegister,
    [stateList.getAdviserPhoneNumber]: AdviserService.getAdviserPhoneNumber,
    [stateList.getAdviserEmail]: AdviserService.getAdviserEmail,
    [stateList.getAdviserCity]: AdviserService.getAdviserCity,
    [stateList.getAdviserField]: AdviserService.getAdviserField,
    [stateList.getAdviserUniversity]: AdviserService.getAdviserUniversity,
    [stateList.getAdviserDescription]: AdviserService.getAdviserDescription,
    [stateList.saveRegisteredAdviserInfo]: AdviserService.saveRegisteredAdviserInfo,
};
