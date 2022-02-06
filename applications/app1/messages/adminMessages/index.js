// welcome message
module.exports.adminStartMessage = `
🌺 سلام مدیر گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `

module.exports.adminInfoMessage = (admin) => `
🔹یوزرنیم : @${admin.Username}
🔸نام و نام خانوادگی مدیر : ${admin.Fullname}

                〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️
    
`

module.exports.adviserInfoMessage = (adviser) => `
🔹یوزرنیم : @${adviser.Username}
🔸نام و نام خانوادگی مشاور : ${adviser.Fullname}

                〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️

`

module.exports.enterNewAdminUsername = ` 🔹 لطفا یوزر نیم مدیر جدید را به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مدیر جدید قادر به بهره مندی از خدمات بات نخواهد بود. `

module.exports.enterNewAdviserUsername = ` 🔹 لطفا یوزر نیم مشاور جدید را به فرم 'nemoone@' وارد نمایید : 
🔸 توجه : در صورت اشتباه وارد نمودن یوزر نیم ، مشاور جدید قادر به بهره مندی از خدمات بات نخواهد بود. `

module.exports.enterRemoveAdminUsername = "🔹 لطفا یوزر نیم مدیری که قصد حذف آنرا دارید به فرم 'nemoone@' وارد نمایید : "
module.exports.enterRemoveAdviserUsername = "🔹 لطفا یوزر نیم مشاوری که قصد حذف آنرا دارید به فرم 'nemoone@' وارد نمایید : "
module.exports.enterAdminFullname = "لطفا نام و نام خانوادگی مدیر جدید را وارد نمایید : "
module.exports.enterAdviserFullname = "لطفا نام و نام خانوادگی مشاور جدید را وارد نمایید : "
module.exports.adminRegistrated = "✅ مدیر جدید با موفقیت ثبت گردید"
module.exports.adviserRegistrated = "✅ مشاور جدید با موفقیت ثبت گردید"
module.exports.adminRemoved = "✅ ادمین با موفقیت حذف شد"
module.exports.adviserRemoved = "✅ مشاور با موفقیت حذف شد"
module.exports.duplicateAdmin = "این مدیر قبلا ثبت شده است❗️ "
module.exports.duplicateAdviser = "این مشاور قبلا ثبت شده است❗️ "
module.exports.noAdminAdded = "مدیری افزوده نشده است❗️"
module.exports.noAdviserAdded = "مشاوری افزوده نشده است❗️"
module.exports.noAdminExist = "مدیری یافت نشد❗️"
module.exports.noAdviserExist = "مشاوری یافت نشد❗️"
module.exports.noStudentExist = "دانش آموزی یافت نشد❗️"
module.exports.showAdminsList = "🔻 لیست مدیران 🔻"
module.exports.showAdvisersList = "🔻 لیست مشاوران 🔻"
module.exports.showAdvisersQuestionsList = "🔻 لیست پیام های مشاوران 🔻"
module.exports.messageSentToAdvisers = "✅ پیام شما برای مشاوران با موفقیت ارسال شد."
module.exports.messageSentToStudents = "✅ پیام شما برای دانش آموزان با موفقیت ارسال شد."
module.exports.enteredUsernameIsInvalid = "فرم یوزرنیم وارد شده نامعتبر است ❗️ لطفا مطابق الگوی ذکر شده یوزرنیم خود را وارد نمایید."