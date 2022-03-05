const PlanModel = require("../../models/Plan");

//************************************* admin section *****************************************\\

module.exports.admin_start_message = `
🌺 سلام مدیر گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `;

module.exports.admins_list_message = (data) => {
  let message = ``;
  data.forEach((item) => {
    message += `      
نام و نام خانوادگی مدیر : ${item.fullname}
یوزرنیم مدیر : @${item.username}

`;
  });
  message += `@radegozine_bot`;
  return message;
};

module.exports.plan_caption = (data) => {
  return `
🔻 نام طرح : ${data.title}
🔻 قیمت طرح :${data.price}
🔻 توضیحات طرح : ${data.description}

@radegozine_bot`
};

module.exports.content_caption = (data) => {
  return `🔻 عنوان تولید محتوا : ${data.title}
🔻 توضیحات : ${data.description}

@radegozine_bot
`;
};

module.exports.statistics_message = (data) => {
  return `📊  آمار و ارقام   📊

    🔻 اعضای بات : ${data.all_members_count}
    🔻 تعداد مدیران : ${data.admins_count}
    🔻 تعداد مشاوران : ${data.advisers_count}
    🔻 تعداد دانش آموزان ویژه : ${data.students_count}
    🔻 تعداد سوالات : ${data.questions_count}
    🔻 تعداد کانال ها : ${data.channels_count}

    @radegozine_bot
    `;
};

module.exports.enter_admin_fullname_message = "لطفا نام و نام خانوادگی مدیر جدید را وارد نمایید : ";
module.exports.enter_new_admin_username_message = ` 🔹 لطفا یوزر نیم مدیر جدید را به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مدیر جدید قادر به بهره مندی از خدمات بات نخواهد بود. `;
module.exports.enter_admin_username_for_remove_message = "🔹 لطفا یوزر نیم مدیری که قصد حذف آنرا دارید به فرم 'nemoone@' وارد نمایید : ";
module.exports.admin_registrated_message = "✅ مدیر جدید با موفقیت ثبت گردید";
module.exports.admin_removed_message = "✅ ادمین با موفقیت حذف شد";
module.exports.duplicate_admin_message = "این مدیر قبلا ثبت شده است❗️ ";
module.exports.no_admin_added_message = "مدیری افزوده نشده است❗️";
module.exports.no_admin_found_message = "مدیری یافت نشد❗️";
module.exports.admins_list_title_message = "🔻 لیست مدیران 🔻";
module.exports.invalid_username_entered_message = "فرم یوزرنیم وارد شده نامعتبر است ❗️";
module.exports.enter_plan_price_message = "لطفا قیمت طرح را طرح وارد نمایید (به تومان) ";
module.exports.enter_plan_description_message = "لطفا توضیحات مورد نظر را وارد نمایید : ";
module.exports.enter_plan_image_message = `لطفا تصویری را در مورد طرح وارد نمایید
        در صورتی که مایل نیستید تصویری را برای طرح بارگذاری کنید بر روی دکمه ی "گذشتن از این مرحله" کلیک کنید`;
module.exports.plan_registered_message = "طرح با موفقیت ثبت شد";
module.exports.duplicate_plan_message = "طرحی با این عنوان در حال حاضر وجود دارد.";
module.exports.adding_plan_was_canceled = "افزودن طرح لغو شد";
module.exports.no_user_found = "کاربری یافت نشد";
module.exports.this_plan_has_already_been_removed_message = "این طرح قبلا حذف شده است.";
module.exports.the_plan_was_removed_message = "طرح مورد نظر حذف گردید.";
module.exports.no_one_has_registered_recently = "اخیرا کسی ثبت نام نکرده است.";
module.exports.select_your_plan_message = "لطفا طرح مورد نظر خود را وارد کنید : ";
module.exports.enter_plan_title_message = "لطفا عنوان طرح را وارد نمایید : ";
module.exports.no_plan_registered_message = "هیچ طرحی ثبت نشده است";
module.exports.no_plan_found_message = "هیچ طرحی برای ثبت نام یافت نشد.";
module.exports.do_you_want_to_remove_this_plan_message = "آیا تمایل به حذف این طرح دارید؟";
//************************************* admin section *****************************************\\

//*************************************  adviser section *****************************************\\

module.exports.reg_adviser_info_message = (data) => {
  return `
🔻 نام و نام خانوادگی : ${data.fullname}
🔻 رشته ی تحصیلی : ${data.field}
🔻 دانشگاه : ${data.university}
🔻 توضیحات : ${data.description}
🔻 شماره تماس : ${data.phone_number}
🔻 ایمیل : ${data.email}
🔻 شهر : ${data.city}
🔻 کد کاربری : ${data.chat_id}
🔻 نام کاربری : @${data.username}

 برای پذیرش این مشاور دکمه ی پذیرش مشاور و برای رد این مشاور دکمه رد مشاور را بزنید :

@radegozine_bot
`;
};

module.exports.advisers_list_message = (data) => {
  let message = ``;
  data.forEach((item) => {
    message += `      
نام و نام خانوادگی مشاور : ${item.fullname}
یوزرنیم مشاور : @${item.username}
رتبه ی مشاور : ${item.is_pro ? "ویژه" : "عادی"}

`;
  });
  message += `@radegozine_bot`;
  return message;
};

module.exports.enter_new_adviser_username_message = ` 🔹 لطفا یوزر نیم مشاور جدید را به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مشاور جدید قادر به بهره مندی از خدمات بات نخواهد بود. `;
module.exports.enter_adviser_username_for_remove_message =
  "🔹 لطفا یوزر نیم مشاوری که قصد حذف آنرا دارید به فرم 'nemoone@' وارد نمایید : ";
module.exports.enter_adviser_fullname_message =
  "لطفا نام و نام خانوادگی مشاور جدید را وارد نمایید : ";
module.exports.adviser_registrated_message =
  "✅ مشاور جدید با موفقیت ثبت گردید";
module.exports.adviser_removed_message = "✅ مشاور با موفقیت حذف شد";
module.exports.The_adviser_was_promoted = "مشاور مورد نظر ارتقای رتبه پیدا کرد";
module.exports.The_adviser_was_demoted = "مشاور مورد نظر تنزل رتبه پیدا کرد";
module.exports.duplicate_adviser_message = "این مشاور قبلا ثبت شده است❗️ ";
module.exports.no_adviser_added_message = "مشاوری افزوده نشده است❗️";
module.exports.no_adviser_found_message = "مشاور یافت نشد❗️";
module.exports.advisers_list_title_message = "🔻 لیست مشاوران 🔻";
module.exports.reg_advisers_list_title_message =
  "🔻 لیست مشاوران (ثبت نامی) 🔻";
module.exports.show_advisers_questions_list_message =
  "🔻 لیست پیام های مشاوران 🔻";
module.exports.your_message_has_been_sent_to_advisers_message =
  "✅ پیام شما برای مشاوران با موفقیت ارسال شد.";
module.exports.no_adviser_found_with_this_username =
  "مشاوری با این یوزرنیم یافت نشد.";
module.exports.adviser_not_found = "مشاور مورد نظر یافت نشد.";
module.exports.adviser_accepted_message =
  "مشاور مورد نظر با موفقیت پذیرفته شد.";
module.exports.this_adviser_has_already_been_removed_message =
  "این مشاور قبلا حذف شده است.";
module.exports.promote_adviser_message = `🔹 لطفا یوزر نیم مشاوری که قصد ارتقای درجه ی آن را دارید به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مشاور ارتقای رتبه نخواهد یافت.`;
module.exports.do_you_want_to_accept_this_adviser_message =
  "آیا تمایل به پذیرش این مشاور دارید؟";
module.exports.do_you_want_to_remove_this_adviser_message =
  "آیا تمایل به حذف این مشاور دارید؟";
module.exports.demote_adviser_message = `🔹 لطفا یوزر نیم مشاوری که قصد تنزل درجه ی آن را دارید به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مشاور تنزل رتبه نخواهد یافت.`;
module.exports.enter_a_person_name_to_tag_message = "لطفا نام شخصی که چسباندن آن به این سوال را دارید وارد کنید : "
module.exports.adviser_not_accepted_message = "مشاور پذیرفته نشد.",
module.exports.your_request_to_register_as_a_adviser_has_been_denied_message = "با عرض تاسف درخواست شما برای ثبت نام به عنوان مشاور رد گردید.",
module.exports.the_name_was_successfully_tagged_to_the_question_message = "نام مورد نظر شما با موفقیت به سوال چسبانده شد.",
//************************************* end  adviser section *****************************************\\

//*************************************  student section  *****************************************\\
module.exports.pro_student_registration_preview = async (data, username) => {
  const plan = await PlanModel.findById(data.plan_id);
  return `🔻 طرح ثبت نام شده : ${
    plan?.title ? plan.title : "غیر قابل تغییر توسط کاربر"
  } 
🔻 نام و نام خانوادگی : ${data.student_fullname}
🔻 نام کاربری : @${data.student_username ? data.student_username : username}
🔻 رشته ی تحصیلی : ${data.student_field}
🔻 پایه ی تحصیلی : ${data.student_grade}
🔻 سطح دانش آموز : ${
    data.student_level
      ? data.student_level
      : "این بخش توسط مشاور مشخص میشود"
  }
🔻 شماره تماس : ${data.student_phone_number}
🔻 ایمیل : ${data.student_email}
🔻 شماره واتساب : ${data.student_whats_up_number}
🔻 شهر : ${data.student_city}

اطلاعات شما بصورت بالا در سیستم ذخیره شده است برای ادامه روند ثبت نام یکی از دکمه های زیر را انتخاب نمایید :

@radegozine_bot
`;
};

module.exports.pro_student_caption = async (data) => {
  const plan = await PlanModel.findById(data.plan_id);
  return `🔻 طرح ثبت نام شده : ${plan.title}
🔻 نام و نام خانوادگی : ${data.fullname}
🔻 رشته ی تحصیلی : ${data.field}
🔻 پایه ی تحصیلی : ${data.grade}
🔻 شماره تماس : ${data.phone_number}
🔻 ایمیل : ${data.email}
🔻 شماره واتساب : ${data.whats_up_number}
🔻 شهر : ${data.city}
🔻 کد کاربری : ${data.chat_id}
🔻 نام کاربری : @${data.username}

@radegozine_bot
`;
};

module.exports.no_student_found_message = "دانش آموز یافت نشد❗️";
module.exports.your_message_has_been_sent_to_student_message = "✅ پیام شما برای دانش آموزان با موفقیت ارسال شد.";
module.exports.enter_pro_student_user_name_message = `لطفا یوزر نیم دانش آموز را به فرم @nemoone وارد نمایید :  `;
module.exports.enter_pro_student_field_message = "لطفا رشته ی تحصیلی دانش آموز را وارد کنید : ";
module.exports.enter_pro_student_grade_message = "لطفا پایه تحصیلی دانش آموز را وارد کنید : ";
module.exports.enter_pro_student_level_message = "لطفا سطح دانش آموز را تعیین کنید : ";
module.exports.enter_pro_student_phone_number_message = "لطفا شماره ی تماس دانش آموز را وارد کنید : ";
module.exports.enter_pro_student_whats_up_number_message = "لطفا شماره ی واتس آپ دانش آموز را وارد کنید : ";
module.exports.enter_pro_student_email_message = "لطفا ایمیل دانش آموز را وارد کنید : ";
module.exports.enter_pro_student_city_message = "لطفا شهر دانش آموز را وارد کنید : ";
module.exports.student_registered_message = "دانش آموز با موفقیت ثبت شد";
module.exports.student_registration_canceled_message = "ثبت نام دانش آموز لغو شد";
module.exports.the_student_became_a_pro_student_message = "دانش آموز مورد نظر تبدیل به دانش آموز ویژه گردید.";
module.exports.this_student_has_already_been_removed_message = "این دانش آموز قبلا حذف شده است.";
module.exports.the_student_was_not_accepted_message = "دانش آموز مورد نظر پذیرفته نشد.";
module.exports.the_student_was_removed_message = "دانش آموز مورد نظر حذف گردید.";
module.exports.do_you_want_to_accept_this_student_message = "آیا تمایل به پذیرش این دانش آموز دارید؟";
module.exports.do_you_want_to_remove_this_student_message = "آیا تمایل به حذف این دانش آموز دارید؟";
module.exports.are_you_sure_you_dont_want_to_accept_this_student_message = "آیا از نپذیرفتن این دانش آموز اطمینان دارید ؟ ";
module.exports.enter_pro_student_full_name_message = "لطفا نام و نام خانوادگی دانش آموز را وارد کنید:";
module.exports.the_student_was_successfully_accepted_message = "دانش آموز با موفقیت پذیرفته شد.";
module.exports.this_student_is_currently_accepted_message = "این دانش آموز در حال حاظر پذیرفته شده است.";

//************************************* end student section *****************************************\\

module.exports.enter_content_title_message = "لطفا عنوان مورد نظر جهت تولید محتوا را وارد نمایید : "
module.exports.there_is_no_registered_title_message = "عنوانی برای تولید محتوا ثبت نشده است."
module.exports.no_title_registered_recently_message = "اخیرا عنوانی برای تولید محتوا افزوده نشده است."
module.exports.enter_a_description_message = "لطفا توضیحاتی را در این باره وارد نمایید : "
module.exports.the_title_was_successfully_updated_message = "عنوان تولید محتوا با موفقیت ویراش شد."
module.exports.the_title_was_successfully_registered_message = "عنوان تولید محتوا با موفقیت ثبت شد."
module.exports.this_title_has_already_been_removed_message = "این عنوان قبلا حذف شده است."
module.exports.this_title_was_removed_message = "این عنوان با موفقیت حذف گردید."