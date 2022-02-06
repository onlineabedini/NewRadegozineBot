module.exports.studentInfoMessage = (Student) => `
❓سوال :${Student.MessageText}❓

👨‍🎓مشخصات دانش آموز :

🔹نام و نام خانوادگی : ${Student.Fullname}

🔹رشته ی تحصیلی : ${Student.Field}

🔹پایه ی تحصیلی : ${Student.Grade}

🔹یوزنیم دانش آموز : @${Student.Username}

@radegozine_bot`

module.exports.voiceCaption = (QuestionText) => `
🟢 سوالات مشاوره ای
⁉️ ${QuestionText}


🟢 ردگزینه
🔵 مشاور - پشتیبانی - تدریس موفقیت کنکور
❤️ برای مشاوره ( ۱۰۰٪  رایگان ) به ما پیام بدید 


🌹👇 سوال خود را از طریق ربات بپرسید
✅ @radegozine_bot

        @radegozine
╰┄┅◇◇◇◇◇┅┄╯
`

module.exports.botDevelopersCaption = `🌹✅  تیم توسعه دهندگان آی آر نود
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

module.exports.showStudentsQuestionsList = "🔻 لیست سوالات دانش آموزان 🔻"
module.exports.enterYourMessage = "لطفا پیام خود را وارد نمایید : "
module.exports.enterYourMessageAsText = "لطفا پیام خود را بصورت متنی وارد نمایید : "
module.exports.messageSent = "✅ پیام شما با موفقیت ارسال شد."
module.exports.messageRemoved = "✅ پیام شما با موفقیت حذف شد."
module.exports.deleteMessageRequestCanceled = "✅ درخواست حذف پیام لغو شد."
module.exports.deleteMessageConfidence = "آیا از حذف این پیام اطمینان دارید؟"
module.exports.somethingWentWrong = "خطایی پیش آمده است لطفا مجددا امتحان نمایید❗️"
module.exports.answerRegistrated = "✅ پاسخ شما ثبت شد و در کانال رد گزینه قرار گرفت."
module.exports.messageDeletedBefore = "این پیام قبلا حذف شده است❗️"
module.exports.tryDeletingMessageAgain  = "اگر در حال حاظر این سوال حذف نشده است مجددا بر روی دکمه ی 'حذف سوال' کلیک نمایید."
module.exports.selectAnItem = "لطفا از لیست زیر یک مورد را انتخاب نمایید ⬇️"
module.exports.requestCanceled = "❎ درخواست شما لغو شد ❎"
module.exports.emptyList = "لیست خالی است❗️"
