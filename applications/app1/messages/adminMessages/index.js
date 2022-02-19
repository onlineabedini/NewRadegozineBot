const PlanModel = require("../../models/Plan");

module.exports.planCaption = (planData) => {
  return `🔻 نام طرح : ${planData.planTitle}
 🔻 قیمت طرح :${planData.planPrice}
🔻 توضیحات طرح : ${planData.planDescription}
@radegozine_bot
`;
};

module.exports.pro_student_preview = async (data, userName) => {
  const plan = await PlanModel.findById(data.planId);
  return `🔻 طرح ثبت نام شده : ${
    plan?.planTitle ? plan.planTitle : "غیر قابل تغییر توسط کاربر"
  } 
🔻 نام و نام خانوادگی : ${data.proStudentFullName}
🔻 نام کاربری : @${data.proStudentUserName ? data.proStudentUserName : userName}
🔻 رشته ی تحصیلی : ${data.proStudentField}
🔻 پایه ی تحصیلی : ${data.proStudentGrade}
🔻 سطح دانش آموز : ${
    data.proStudentLevel
      ? data.proStudentLevel
      : "این بخش توسط مشاور مشخص میشود"
  }
🔻 شماره تماس : ${data.proStudentPhoneNumber}
🔻 ایمیل : ${data.proStudentEmail}
🔻 شماره واتساب : ${data.proStudentWhatsUpNumber}
🔻 شهر : ${data.proStudentCity}

اطلاعات شما بصورت بالا در سیستم ذخیره شده است برای ادامه روند ثبت نام یکی از دکمه های زیر را انتخاب نمایید :

@radegozine_bot
`;
};

module.exports.proStudentCaption = async (data) => {
  const plan = await PlanModel.findById(data.userPlanId);
  return `🔻 طرح ثبت نام شده : ${plan.planTitle}
🔻 نام و نام خانوادگی : ${data.userFullName}
🔻 رشته ی تحصیلی : ${data.userField}
🔻 پایه ی تحصیلی : ${data.userGrade}
🔻 شماره تماس : ${data.userPhoneNumber}
🔻 ایمیل : ${data.userEmail}
🔻 شماره واتساب : ${data.userWhatsUpNumber}
🔻 شهر : ${data.userCity}
🔻 کد کاربری : ${data.userChatId}
🔻 نام کاربری : @${data.userName}

@radegozine_bot
`;
};

module.exports.reg_adviser_info_message = (data) => {
  return `
🔻 نام و نام خانوادگی : ${data.userFullName}
🔻 رشته ی تحصیلی : ${data.userField}
🔻 دانشگاه : ${data.userUniversity}
🔻 توضیحات : ${data.userDescription}
🔻 شماره تماس : ${data.userPhoneNumber}
🔻 ایمیل : ${data.userEmail}
🔻 شهر : ${data.userCity}
🔻 کد کاربری : ${data.userChatId}
🔻 نام کاربری : @${data.userName}

 برای پذیرش این مشاور دکمه ی پذیرش مشاور و برای رد این مشاور دکمه رد مشاور را بزنید :

@radegozine_bot
`;
};

module.exports.admins_list_message = (data) => {
  let message = ``;
  data.forEach((item) => {
    message += `      
نام و نام خانوادگی مدیر : ${item.userFullName}
یوزرنیم مدیر : @${item.userName}

`;
  });
  message += `@radegozine_bot`;
  return message;
};

module.exports.advisers_list_message = (data) => {
  let message = ``;
  data.forEach((item) => {
    message += `      
نام و نام خانوادگی مشاور : ${item.userFullName}
یوزرنیم مشاور : @${item.userName}
رتبه ی مشاور : ${item.isPro ? "ویژه" : "عادی"}

`;
  });
  message += `@radegozine_bot`;
  return message;
};

module.exports.adminStartMessage = `
🌺 سلام مدیر گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `;

module.exports.enterNewAdminUsername = ` 🔹 لطفا یوزر نیم مدیر جدید را به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مدیر جدید قادر به بهره مندی از خدمات بات نخواهد بود. `;

module.exports.enterNewAdviserUsername = ` 🔹 لطفا یوزر نیم مشاور جدید را به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مشاور جدید قادر به بهره مندی از خدمات بات نخواهد بود. `;

module.exports.enterRemoveAdminUsername =
  "🔹 لطفا یوزر نیم مدیری که قصد حذف آنرا دارید به فرم 'nemoone@' وارد نمایید : ";
module.exports.enterRemoveAdviserUsername =
  "🔹 لطفا یوزر نیم مشاوری که قصد حذف آنرا دارید به فرم 'nemoone@' وارد نمایید : ";
module.exports.enterAdminFullname =
  "لطفا نام و نام خانوادگی مدیر جدید را وارد نمایید : ";
module.exports.enterAdviserFullname =
  "لطفا نام و نام خانوادگی مشاور جدید را وارد نمایید : ";
module.exports.adminRegistrated = "✅ مدیر جدید با موفقیت ثبت گردید";
module.exports.adviserRegistrated = "✅ مشاور جدید با موفقیت ثبت گردید";
module.exports.adminRemoved = "✅ ادمین با موفقیت حذف شد";
module.exports.adviserRemoved = "✅ مشاور با موفقیت حذف شد";
module.exports.duplicateAdmin = "این مدیر قبلا ثبت شده است❗️ ";
module.exports.duplicateAdviser = "این مشاور قبلا ثبت شده است❗️ ";
module.exports.noAdminAdded = "مدیری افزوده نشده است❗️";
module.exports.noAdviserAdded = "مشاوری افزوده نشده است❗️";
module.exports.noAdminExist = "مدیری یافت نشد❗️";
module.exports.noAdviserExist = "مشاوری یافت نشد❗️";
module.exports.noStudentExist = "دانش آموزی یافت نشد❗️";
module.exports.showAdminsList = "🔻 لیست مدیران 🔻";
module.exports.showAdvisersList = "🔻 لیست مشاوران 🔻";
module.exports.showAdvisersQuestionsList = "🔻 لیست پیام های مشاوران 🔻";
module.exports.messageSentToAdvisers =
  "✅ پیام شما برای مشاوران با موفقیت ارسال شد.";
module.exports.messageSentToStudents =
  "✅ پیام شما برای دانش آموزان با موفقیت ارسال شد.";
module.exports.enteredUsernameIsInvalid =
  "فرم یوزرنیم وارد شده نامعتبر است ❗️ لطفا مطابق الگوی ذکر شده یوزرنیم خود را وارد نمایید.";
