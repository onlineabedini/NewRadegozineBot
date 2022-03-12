module.exports.adviser_start_message = `
🌺 سلام مشاور گرامی به ربات رد گزینه خوش آمدید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 
 `
module.exports.pro_adviser_start_message = `
🌺 سلام مشاور گرامی شما جزو مشاورین ویژه میباشید 🌺
🔹 برای بهره مندی از خدمات این بات لطفا از منوی زیر یک گزینه را به دلخواه
        انتخاب نمایید:
 @radegozine_bot
 `

module.exports.content_production_titles_list_message = (data) => {
    return `
🟢   عنوان  :  ${data.title}

🔴   توضیحات تکمیلی :  ${data.description}

@radegozine_bot
`;
}
module.exports.you_have_been_promoted = `🟢 شما به مشاور ویژه ارتقای درجه پیدا کردید لطفا مجددا بات را /start نمایید.`
module.exports.you_have_been_demoted = "🔴 درجه ی شما به مشاور عادی تنزل یافت."