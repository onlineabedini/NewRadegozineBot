// List of states
module.exports = {
    //Register new admin
    add_admin: "add_admin",
    get_admin_fullname: "get_admin_fullname",
    remove_admin: "remove_admin",
    //Register new adviser
    add_adviser: "add_adviser",
    get_adviser_fullname: "get_adviser_fullname",
    remove_adviser: "remove_adviser",
    promote_adviser: "promote_adviser",
    demote_adviser: "demote_adviser",
    //Register new plan
    get_plan_title: "get_plan_title",
    get_plan_price: "get_plan_price",
    get_plan_image: "get_plan_image",
    get_plan_description: "get_plan_description",
    register_plan: "register_plan",
    remove_plan: "remove_plan",
    //Send message
    send_message_for_admins: "send_message_for_admins",
    send_message_for_advisers: "send_message_for_advisers",
    send_message_for_all_users: "send_message_for_all_users",
    send_message_for_reg_students: "send_message_for_reg_students",
    send_message_for_channels: "send_message_for_channels",
    //Ask question and answer
    get_student_fullname: "get_student_fullname",
    get_student_field: "get_student_field",
    get_student_grade: "get_student_grade",
    ask_question: "ask_question",
    tag_person : "tag_person",
    answer: "answer",
    //Register new pro student
    get_pro_student_fullname: "get_pro_student_fullname",
    get_pro_student_field: "get_pro_student_field",
    get_pro_student_grade: "get_pro_student_grade",
    get_pro_student_phone_number: "get_pro_student_phone_number",
    get_pro_student_whats_up_number: "get_pro_student_whats_up_number",
    get_pro_student_email: "get_pro_student_email",
    get_pro_student_city: "get_pro_student_city",
    get_pro_student_payment_picture: "get_pro_student_payment_picture",
    register_pro_student: "register_pro_student",
    //Register new pro student by admin
    get_pro_student_fullname_from_admin: "get_pro_student_fullname_from_admin",
    get_pro_student_username_from_admin: "get_pro_student_username_from_admin",
    get_pro_student_field_from_admin: "get_pro_student_field_from_admin",
    get_pro_student_grade_from_admin: "get_pro_student_grade_from_admin",
    get_pro_student_level_from_admin: "get_pro_student_level_from_admin",
    get_pro_student_phone_number_from_admin: "get_pro_student_phone_number_from_admin",
    get_pro_student_whats_up_number_from_admin: "get_pro_student_whats_up_number_from_admin",
    get_pro_student_email_from_admin: "get_pro_student_email_from_admin",
    get_pro_student_city_from_admin: "get_pro_student_city_from_admin",
    register_pro_student_by_admin: "register_pro_student_by_admin",
    //Register new adviser by himself
    get_adviser_fullname_for_register: "get_adviser_fullname_for_register",
    get_adviser_phone_number: "get_adviser_phone_number",
    get_adviser_email: "get_adviser_email",
    get_adviser_city: "get_adviser_city",
    get_adviser_field: "get_adviser_field",
    get_adviser_university: "get_adviser_university",
    get_adviser_description: "get_adviser_description",
    register_new_adviser: "register_new_adviser",
    //Send contact for pro student
    get_field_for_send_content: "get_field_for_send_content",
    get_grade_for_send_content: "get_grade_for_send_content",
    get_level_for_send_content: "get_level_for_send_content",
    send_content_for_pro_students: "send_content_for_pro_students",
    //Send contact for all users
    send_content_for_all_students: "send_content_for_all_students",
    //create new content title
    get_content_title: "get_content_title",
    get_content_description: "get_content_description",
    //confidence
    accept_adviser: "accept_adviser",
    reject_adviser: "reject_adviser",

    accept_student: "accept_student",
    reject_student: "reject_student",
    delete_student: "delete_student",
    remove_student: "remove_student",

    remove_question: "remove_question",
    remove_content: "remove_content"
};
