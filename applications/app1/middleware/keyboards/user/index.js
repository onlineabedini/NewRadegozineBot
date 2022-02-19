//import StudentService class
const UserService = require("./UserService");

//import buttons text
const {all_buttons_text} = require("../../../buttons/all_keyborad_text");

module.exports = {
  [all_buttons_text.ask_question]: UserService.ask_question,
  [all_buttons_text.register]: UserService.register,
  [all_buttons_text.register_as_pro_students]: UserService.register_as_pro_students,
  [all_buttons_text.register_as_adviser]: UserService.register_as_adviser,
};
