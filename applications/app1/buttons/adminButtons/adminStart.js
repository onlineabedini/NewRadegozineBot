/*

 ( Note )
 follow the same pattern for all buttons
 export moduls like this for all buttons

*/
// use this for application


// buttons text
AdminMainMenu = {
    MANAGEADMINS: "👤  مدیریت مدیران",
    MANAGEADVISERS: "🗣  مدیریت مشاوران",
    SENDMESSAGEFORADVISERS: "📤  ارسال پیام برای مشاوران",
    SENDMESSAGEFORSTUDENTS: "📤  ارسال پیام برای دانش آموزان",
    ADVISERSQUESTIONSLIST: "📥  پیام های مشاوران",
    STUDENTSQUESTIONSLIST: "📥  لیست سوالات دانش آموزان",
    BOTDEVELOPERS: "👨🏻‍💻  تیم توسعه و طراحی بات  👨🏻‍💻",
};


// buttons reply
module.exports = AdminsStartBtns = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                { text: AdminMainMenu.MANAGEADVISERS },
                { text: AdminMainMenu.MANAGEADMINS },
            ],
            [
                { text: AdminMainMenu.SENDMESSAGEFORSTUDENTS },
                { text: AdminMainMenu.SENDMESSAGEFORADVISERS },
            ],
            [
                { text: AdminMainMenu.STUDENTSQUESTIONSLIST },
                { text: AdminMainMenu.ADVISERSQUESTIONSLIST },
            ],
            [{ text: AdminMainMenu.BOTDEVELOPERS }],
        ],
    },
};