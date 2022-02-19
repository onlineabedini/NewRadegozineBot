module.exports.studentInfoMessage = (student) => `
❓ سوال :${student.userMessageText}❓

👨‍🎓مشخصات دانش آموز :

🔹نام و نام خانوادگی : ${student.userFullName}

🔹رشته ی تحصیلی : ${student.userField}

🔹پایه ی تحصیلی : ${student.userGrade}

🔹یوزنیم دانش آموز : @${student.userName}

@radegozine_bot`

module.exports.voice_caption = (questioner) => `
🟢 سوالات مشاوره ای
⁉️ ${questioner.userMessageText}


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

module.exports.forceJoinMessage = (channelUserNames) => {
    let message = ``
    channelUserNames.forEach((item) => {
        message += ` @${item} `
    })
    return `برای استفاده از بات باید در کانال های زیر عضو شوید
    ${message}`
}

module.exports.questionsListTitle = "🔻 لیست سوالات دانش آموزان 🔻"
module.exports.enterYourMessage = "لطفا پیام خود را وارد نمایید : "
module.exports.enterYourAnswerAsVoice = "لطفا پاسخ خود را بصورت ویس وارد نمایید : "
module.exports.enterYourMessageAsText = "لطفا پیام خود را بصورت متنی وارد نمایید : "
module.exports.onlyVoiceMessage = "لطفا پیام خود را فقط به صورت ویس وارد نمایید❗️"
module.exports.onlyTextMessage = "لطفااطلاعات خواسته شده را فقط به صورت متنی وارد نمایید❗️"
module.exports.youHaveBeenRemoved = "شما از لیست مدیران و یا مشاوران حذف شده اید ❗️ "
module.exports.messageSent = "✅ پیام شما با موفقیت ارسال شد."
module.exports.messageRemoved = "✅ پیام شما با موفقیت حذف شد."
module.exports.deleteMessageRequestCanceled = "✅ درخواست حذف پیام لغو شد."
module.exports.deleteMessageConfidence = "آیا از حذف این پیام اطمینان دارید؟"
module.exports.somethingWentWrong = "خطایی پیش آمده است لطفا مجددا امتحان نمایید❗️"
module.exports.answerRegistrated = "✅ پاسخ شما ثبت شد و در کانال رد گزینه قرار گرفت."
module.exports.messageDeletedBefore = "این پیام قبلا حذف شده است❗️"
module.exports.tryDeletingMessageAgain = "اگر در حال حاظر این سوال حذف نشده است مجددا بر روی دکمه ی 'حذف سوال' کلیک نمایید."
module.exports.selectAnItem = "لطفا از لیست زیر یک مورد را انتخاب نمایید ⬇️"
module.exports.requestCanceled = "❎ درخواست شما لغو شد ❎"
module.exports.emptyList = "لیست خالی است❗️"

