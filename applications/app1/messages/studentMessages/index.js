module.exports.student_start_message = `
🌺 سلام دانش آموز گرامی شما هم اکنون جزو دانش آموزان ویژه میباشد 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `
;module.exports.user_start_message = `
🌺 سلام کاربران گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `;

module.exports.registered_for_plan_message = (plan) => {
    return `دانش آموز گرامی شما در طرح ${plan.planTitle} ثبت نام کرده اید 
        هزینه این طرح ${plan.planPrice} تومان می باشد 
        لطفا پس از پرداخت این مبلغ عکسی از آن را برای بات ارسال کنید تا حساب شما فعال شود.`
}

module.exports.student_info = (data, plan_title) => {
    return `🔻 اطلاعات شما بصورت زیر ذخیره شده است : 🔻
    
🔹 نام طرح ثبت نامی : ${plan_title}
🔹 نام و نام خانوادگی : ${data.userFullName}
🔹 رشته ی تحصیلی : ${data.userField}
🔹 پایه ی تحصیلی : ${data.userGrade}
🔹 شماره ی تماس : ${data.userPhoneNumber}
🔹 شماره واتس آپ : ${data.userWhatsUpNumber}
🔹 ایمیل : ${data.userEmail}
🔹 شهر محل زندگی : ${data.userCity}

🔸 در صورت تمایل میتوانید با کلیک بر روی دکمه ی بروزرسانی اطلاعت من 
نسبت به تغییر اطلاعات خود اقدام نمایید.

@radegozine_bot

`;
};

module.exports.pro_students_register_message =  `
علیرضا عابدینی
شماره کارت : 
6219861903895505

❌ توجه ❌
- به این شماره کارت هزینه طرح را واریز کنید و عکس ( کاملا واضح ) از فیش پرداخت خود در همین قسمت ارسال کنید.

❌ تذکر ❌ فیش پرداخت رو تا بعد از تایید شدن پرداخت پیش خودتون نگه دارید و دور نندازید تا درصورت درخواست ادمین مجدد تصویر ارسال کنید.

- درصورت بروز هرگونه مشکل با ما تماس بگیرید: 
09924730751
@radegozine_manager`

module.exports.preview_adviser_registration_form = (
    data,
) => {
    return `🔹 اطلاعات ثبت شده برای ثبت نام در رد گزینه:
🔹 نام و نام خانوادگی : ${data.adviserFullName}
🔹 شماره تلفن: ${data.adviserPhoneNumber}
🔹 ایمیل: ${data.adviserEmail}
🔹 شهر: ${data.adviserCity}
🔹 توضیحات: ${data.adviserDescription}

اطلاعات شما بصورت بالا ذخیره شده است و برای ثبت نام در رد گزینه استفاده می شود.
برای ثبت و یا لغو ثبت اطلاعت لطفا یکی ا یکی از گزینه های زیر را انتخاب نمایید:

@radegozine_bot
`;
};

module.exports.asking_question_guide = "دانش آموز گرامی جهت پرسش از مشاورین باید مشخصات خواسته شده را وارد نمایید❗️";
module.exports.enter_your_question_as_text = "لطفا سوال خود را را بصورت متنی وارد نمایید : ";
module.exports.enter_payment_picture_message = "لطفا تصویر رسید خود را وارد کنید:";
module.exports.ask_question_from_pro_adviser_message = "برای ارتباط با هر مشاور روی دکمه ی مربوط به آن کلیک نمایید : ";
module.exports.your_question_registrated_message = "✅ سوال شما ثبت گردید و دراسرع وقت توسط مشاوران پاسخ داده خواهد شد.";
module.exports.your_question_answered_message = "✅ سوال شما پاسخ داده شد و در کانال رد گزینه قرار گرفت.";
module.exports.see_plans_message = "برای دیدن طرح ها بر روی دکمه ی زیر کلیک کنید ⬇️";
module.exports.contact_with_admin_message = "برای ارتباط با مدیر بر روی کلید زیر کلیک کنید ⬇️";
