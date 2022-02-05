const AdviserController = require('../adviser/AdviserService');
const stateList = require('../../stateList')

module.exports = {
  [stateList.SENDMESSAGEFORADMINS]: AdviserController.sendMessageForAdmins,
  [stateList.ANSWER]: AdviserController.answer,
};
