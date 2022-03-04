module.exports.student_info_message = (student) => `
❓ سوال :${student.message_text}❓

👨‍🎓مشخصات دانش آموز :

🔹نام و نام خانوادگی : ${student.fullname}

🔹رشته ی تحصیلی : ${student.field}

🔹پایه ی تحصیلی : ${student.grade}

🔹یوزنیم دانش آموز : @${student.username}

@radegozine_bot`;

module.exports.voice_caption = (question) => `
🟢 سوالات مشاوره ای
⁉️ ${question.message_text}


🟢 ردگزینه
🔵 مشاور - پشتیبانی - تدریس موفقیت کنکور
❤️ برای مشاوره ( ۱۰۰٪  رایگان ) به ما پیام بدید 


🌹👇 سوال خود را از طریق ربات بپرسید
✅ @radegozine_bot

        @radegozine
╰┄┅◇◇◇◇◇┅┄╯
`

module.exports.force_join_message = (channel_usernames) => {
    let message = ``
    channel_usernames.forEach((item) => {
        message += ` @${item} `
    })
    return `برای استفاده از بات باید در کانال های زیر عضو شوید
    ${message}`
}

module.exports.bot_developers_caption = `🌹✅  تیم توسعه دهندگان آی آر نود
طراحی بات ( اختصاصی - خصوصی )

🟢 طراحی انواع وبسایت، وب اپلیکیشن و  بات تلگرام + خدمات سئو  + مارکتینگ و برندسازی اختصاصی
 
🔻شخصی
🔻 شرکتی
🔻 فروشگاهی
🔻 آموزشی
🔻 فیلم و سرگرمی 
🔻 خدماتی
🔻 خبری و مقاله
🔻 وبلاگ 

▫️ ir - node
 (https://t.me/ir_node)🔸 irnode.com
🔹 @onlineabedini  👈  ارتباط با ما ~~`

module.exports.questions_list_title_message = "🔻 لیست سوالات دانش آموزان 🔻"
module.exports.enter_your_message = "لطفا پیام خود را وارد نمایید : "
module.exports.enter_your_answer_as_voice_message = "لطفا پاسخ خود را بصورت ویس وارد نمایید : "
module.exports.enter_your_message_as_text = "لطفا پیام خود را بصورت متنی وارد نمایید : "
module.exports.voice_message_only = "لطفا پیام خود را فقط به صورت ویس وارد نمایید❗️"
module.exports.text_message_only = "لطفااطلاعات خواسته شده را فقط به صورت متنی وارد نمایید❗️"
module.exports.you_have_been_removed_message = "شما از لیست مدیران و یا مشاوران حذف شده اید ❗️ "
module.exports.no_channel_found_message = " کانالی یافت نشد ❗️"
module.exports.message_sent_successfully = "✅ پیام شما با موفقیت ارسال شد."
module.exports.message_removed_successfully = "✅ پیام شما با موفقیت حذف شد."
module.exports.request_to_remove_message_was_canceled = "✅ درخواست حذف پیام لغو شد."
module.exports.confidence_message = "آیا از حذف این پیام اطمینان دارید؟"
module.exports.something_went_wrong = "خطایی پیش آمده است لطفا مجددا امتحان نمایید❗️"
module.exports.this_message_has_already_been_removed = "این پیام قبلا حذف شده است❗️"
module.exports.select_an_item_message = "لطفا از لیست زیر یک مورد را انتخاب نمایید ⬇️"
module.exports.your_request_has_been_canceled = "❎ درخواست شما لغو شد ❎"
module.exports.empty_list_message = "لیست خالی است❗️"
module.exports.enter_phone_number_message = "لطفا شماره ی تماس خود را وارد نمایید : "
module.exports.enter_whats_up_number_message = "لطفا شماره ی واتس آپ خود را وارد نمایید : "
module.exports.enter_full_name_message = "لطفا نام و نام خانوادگی خود را وارد نمایید : "
module.exports.enter_email_message = "لطفا ایمیل خود را وارد کنید (اختیاری)"
module.exports.enter_city_message = "لطفا شهر خود را وارد کنید : "
module.exports.enter_field_message = "لطفا رشته ی  خود را وارد کنید : "
module.exports.enter_grade_message = "لطفا پایه ی تحصیلی خود را وارد کنید : "
module.exports.enter_university_message = "لطفا نام دانشگاهی که در آن تحصیل می کنید را وارد نمایید :"
module.exports.enter_description_message = "لطفا توضیحاتی (مثل سابقه ی کار) و یا سایر موارد را در مورد خود وارد کنید : "
module.exports.your_information_has_been_registered_you_will_be_notified_if_confirmed_message = "اطلاعات شما با موفقیت ثبت شد و در صورت تایید به شما اطلاع داده خواهد شد"
module.exports.your_registration_has_been_canceled_message = "ثبت نام شما لغو شد ."
module.exports.something_went_wrong_please_try_again_message = "خطایی پیش آمده لطفا مجددا امتحان نمایید."
module.exports.your_information_was_successfully_registered_message = "✅ اطلاعات شما با موفقیت ثبت شد ✅"
module.exports.this_plan_no_longer_exists_message = "این طرح دیگر وجود ندارد."
module.exports.photo_message_only = "لطفا پیام خود را فقط به صورت تصویر ارسال کنید"
module.exports.payment_photo_was_sent_to_admin_message = "تصویر پرداخت شما برای مدیر ارسال شده و پس از تایید حساب شما فعال خواهد شد."
module.exports.your_information_is_not_recorded_message = "اطلاعات شما ثبت نشده است لطفا مجددا ثبت نام کنید."
module.exports.your_answer_registered_message = "جواب شما ثبت شد و به تمام کانال ها ارسال شد"
module.exports.bot_is_not_a_member_of_any_channels_message = "بات عضو هیچ کانالی نیست."
module.exports.question_was_removed_message = "سوال با موفقیت حذف گردید."
module.exports.this_question_has_already_been_removed_message = "این سوال قبلا حذف شده است."
module.exports.enter_pro_student_content_message = "لطفا پیام خود را وارد نمایید : "
module.exports.content_sent_message = "محتوا با موفقیت ارسال شد."
module.exports.no_questions_to_show_message = "سوالی برای نمایش وجود ندارد"
module.exports.no_student_found_with_these_filters_message = "هیچ دانش آموزی با این فیلتر ها یافت نشد."
module.exports.sorry_your_information_was_not_found = "متاسفانه اطلاعات شما یافت نشد"
module.exports.are_you_sure_you_want_to_remove_this_question_message = "آیا از حذف این سوال اطمینان دارید؟"
module.exports.select_field_for_sending_content_message = "لطفا رشته ی تحصیلی ای که قصد ارسال محتوا برای آن را دارید انتخاب نمایید : "
module.exports.enter_content_message = "لطفا پیام حاوی محتوایی که قصد انتشار آنرا دارید برای بات ارسال کنید :  "
module.exports.this_user_no_longer_exists_message = "این کاربر دیگر وجود ندارد."
module.exports.please_enter_the_requested_information_message = "لطفا برای ثبت نام اطلاعات خواسته شده را وارد نمایید : ";
module.exports.you_have_been_accepted_message = `ثبت نام شما تایید شد. برای استفاده از خدمات ویژه با را مجددا /start کنید`
module.exports.information_updated_message = "اطلاعات شما بروزرسانی شد"
module.exports.error_updating_information_message = "اطلاعات با موفقیت بروزرسانی شد"
module.exports.information_update_canceled_message = "بروزرسانی اطلاعات لغو شد."
module.exports.input_is_invalid_message = "ورودی نامعتبر میباشد."
module.exports.no_contact_number = "فاقد شماره ی تماس"
module.exports.no_email = "فاقد ایمیل"
module.exports.no_city = "فاقد نام شهر"
module.exports.registration_has_not_been_completed_message = "ثبت نام شما موفقیت آمیز نبود.برای پیگیری علت آن با ادمین تماس حاصل فرمایید."
