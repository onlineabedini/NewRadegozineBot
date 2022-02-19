const StudentService = require("../student/StudentService")

const {all_buttons_text} = require("../../../buttons/all_keyborad_text");

module.exports = {
    [all_buttons_text.update_my_info]: StudentService.update_my_info,
    [all_buttons_text.ask_question_from_pro_adviser]: StudentService.ask_question_from_pro_adviser,
}