module.exports.studentStartMessage = `
🌺 سلام دانش آموز گرامی شما هم اکنون جزو دانش آموزان ویژه میباشد 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `
;module.exports.userStartMessage = `
🌺 سلام کاربران گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `;

module.exports.previewAdviserRegistrationForm = (
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

module.exports.askingQuestionGuide =
  "دانش آموز گرامی جهت پرسش از مشاورین باید مشخصات خواسته شده را وارد نمایید❗️";
module.exports.enterFullname = "لطفا نام و نام خانوادگی خود را وارد نمایید : ";
module.exports.enterField = "لطفا رشته ی تحصیلی خود را وارد نمایید : ";
module.exports.enterGrade = "لطفا پایه ی تحصیلی خود را وارد نمایید : ";
module.exports.enterQuestion = "لطفا سوال خود را را بصورت متنی وارد نمایید : ";
module.exports.questionRegistrated =
  "✅ سوال شما ثبت گردید و دراسرع وقت توسط مشاوران پاسخ داده خواهد شد.";
module.exports.yourQuestionAnswered =
  "✅ سوال شما پاسخ داده شد و در کانال رد گزینه قرار گرفت.";
module.exports.seePlansMessage =
  "برای دیدن طرح ها بر روی دکمه ی زیر کلیک کنید ⬇️";
module.exports.contactWithAdminMessage =
  "برای ارتباط با مدیر بر روی کلید زیر کلیک کنید ⬇️";
