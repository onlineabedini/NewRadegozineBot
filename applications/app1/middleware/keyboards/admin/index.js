//import AdminService class
const AdminService = require('./AdminService')

//import buttons text
const {all_buttons_text} = require("../../../buttons/all_keyborad_text");

module.exports = {
    [all_buttons_text.manage_admins]: AdminService.manage_admins,
    [all_buttons_text.show_admins_list]: AdminService.show_admins_list,
    [all_buttons_text.add_admin]: AdminService.add_admin,
    [all_buttons_text.remove_admin]: AdminService.remove_admin,

    [all_buttons_text.manage_advisers]: AdminService.manage_advisers,
    [all_buttons_text.show_advisers_list]: AdminService.show_advisers_list,
    [all_buttons_text.show_reg_advisers_list]: AdminService.show_reg_advisers_list,
    [all_buttons_text.add_adviser]: AdminService.add_adviser,
    [all_buttons_text.remove_adviser]: AdminService.remove_adviser,
    [all_buttons_text.promote_adviser]: AdminService.promote_adviser,
    [all_buttons_text.demote_adviser]: AdminService.demote_adviser,

    [all_buttons_text.manage_pro_students]: AdminService.manage_pro_students,
    [all_buttons_text.show_update_remove_students]: AdminService.show_update_remove_students,
    [all_buttons_text.add_student]: AdminService.add_student,


    [all_buttons_text.manage_plans]: AdminService.manage_plans,
    [all_buttons_text.show_update_remove_plans]: AdminService.show_update_remove_plans,
    [all_buttons_text.add_plan]: AdminService.add_plan,

    [all_buttons_text.send_message_for_advisers]: AdminService.send_message_for_advisers,
    [all_buttons_text.send_message_for_users]: AdminService.send_message_for_users,
    [all_buttons_text.show_advisers_questions_list]: AdminService.show_advisers_questions_list,

}
