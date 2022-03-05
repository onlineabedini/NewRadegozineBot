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
    let message = `
    🔻 لیست عناوین تولید محتوا 🔻
    `;
    data.forEach((item) => {
        message += `
🟣   عنوان  :  ${item.title}

🟡   توضیحات تکمیلی :  ${item.description}

`;
    });
    message += `@radegozine_bot`;
    return message;
}
