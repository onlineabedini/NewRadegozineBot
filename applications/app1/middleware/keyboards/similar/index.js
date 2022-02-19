//import SimilarService class
const SimilarService = require('./SimilarService');

//import buttons text
const {all_buttons_text} = require("../../../buttons/all_keyborad_text");

module.exports = {
    [all_buttons_text.send_content_for_students]: SimilarService.send_content_for_students,
    [all_buttons_text.send_content_for_pro_students]: SimilarService.send_content_for_pro_students,
    [all_buttons_text.send_content_for_all_students]: SimilarService.send_content_for_all_students,
    [all_buttons_text.cancel]: SimilarService.cancel,
    [all_buttons_text.back]: SimilarService.back,
    [all_buttons_text.show_plans]: SimilarService.show_plans,
    [all_buttons_text.contact_with_admin]: SimilarService.contact_with_admin,
    [all_buttons_text.contact_with_developer]: SimilarService.contact_with_developer,
    [all_buttons_text.bot_developers]: SimilarService.bot_developers,
    [all_buttons_text.show_users_questions_list]:SimilarService.show_users_questions_list
}
