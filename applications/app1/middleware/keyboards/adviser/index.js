// import AdviserService class
const AdviserService = require('./AdviserService')

//import buttons text
const {all_buttons_text} = require("../../../buttons/all_keyborad_text");

module.exports = {
    [all_buttons_text.send_message_for_admins]: AdviserService.send_message_for_admins,
}