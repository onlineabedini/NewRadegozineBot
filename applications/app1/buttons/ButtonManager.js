mainButtonsText = {
  manageAdmins: "👤  مدیریت مدیران",
  manageAdvisers: "🗣  مدیریت مشاوران",
  addAdmin: "➕  افزودن مدیر",
  removeAdmin: "❌  حذف مدیر",
  getAdminsList: "👤  نمایش لیست مدیران",
  addAdviser: "➕  افزودن مشاور",
  removeAdviser: "❌  حذف مشاور",
  getAdvisersList: "🗣  نمایش لیست مشاوران",
  sendMessageForAdmins: "📤  ارسال پیام برای مدیران",
  sendMessageForAdvisers: "📤  ارسال پیام برای مشاوران",
  sendMessageForStudents: "📤  ارسال پیام برای دانش آموزان",
  getAdvisersQuestionsList: "📥  پیام های مشاوران",
  getStudentsQuestionsListForAdmins: "📥  نمایش لیست سوالات دانش آموزان",
  getStudentsQuestionsList: "📥  لیست سوالات دانش آموزان",
  askQuestion: "⁉️  سوال از مشاورین  ⁉️",
  showPlans: "🗂  طرح ها  🗂",
  contactWithAdmin: "👤  ارتباط با مدیر  👤",
  botDevelopers: "👨🏻‍💻  تیم توسعه و طراحی بات  👨🏻‍💻",
  cancel: "❌        لغو        ❌",
  addAdminCancel: "❌        لغو افزودن مدیر        ❌",
  removeAdminCancel: "❌        لغو حذف مدیر        ❌",
  addAdviserCancel: "❌        لغو افزودن مشاور        ❌",
  removeAdviserCancel: "❌        لغو حذف مشاور        ❌",
  back: "↩️  بازگشت",
};

const AdminsStartBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [
        { text: mainButtonsText.manageAdvisers },
        { text: mainButtonsText.manageAdmins },
      ],
      [
        { text: mainButtonsText.sendMessageForStudents },
        { text: mainButtonsText.sendMessageForAdvisers },
      ],
      [
        { text: mainButtonsText.getStudentsQuestionsListForAdmins },
        { text: mainButtonsText.getAdvisersQuestionsList },
      ],
      [{ text: mainButtonsText.botDevelopers }],
    ],
  },
};

const AdvisersStartBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: mainButtonsText.getStudentsQuestionsList}],
      [{ text: mainButtonsText.sendMessageForAdmins }],
      [{ text: mainButtonsText.botDevelopers }],
    ],
  },
};

const StudentsStartBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: mainButtonsText.askQuestion }],
      [
        { text: mainButtonsText.contactWithAdmin },
        { text: mainButtonsText.showPlans },
      ],
      [{ text: mainButtonsText.botDevelopers }],
    ],
  },
};

const manageAdminsBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: mainButtonsText.getAdminsList }],
      [
        { text: mainButtonsText.removeAdmin },
        { text: mainButtonsText.addAdmin },
      ],
      [{ text: mainButtonsText.back }],
    ],
  },
};

const manageAdvisersBtns = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: mainButtonsText.getAdvisersList}],
      [
        { text: mainButtonsText.removeAdviser },
        { text: mainButtonsText.addAdviser },
      ],
      [{ text: mainButtonsText.back }],
    ],
  },
};

const answerBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: "پاسخ به سوال", callback_data: `ANSWER` }],
      [{ text: "حذف سوال", callback_data: `DELETE` }],
    ],
  },
};

const confidenceBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [
        { text: "خیر", callback_data: `NO` },
        { text: "بله", callback_data: `YES` },
      ],
    ],
  },
};

const cancelAdviserAnswerBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [[{ text: "لغو", callback_data: "CANCEL" }]],
  },
};

const addAdminCancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: mainButtonsText.addAdminCancel }]],
  },
};

const removeAdminCancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: mainButtonsText.removeAdminCancel }]],
  },
};

const addAdviserCancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: mainButtonsText.addAdviserCancel }]],
  },
};

const removeAdviserCancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: mainButtonsText.removeAdviserCancel }]],
  },
};

const cancelBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: mainButtonsText.cancel }]],
  },
};

const backBtn = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: mainButtonsText.back }]],
  },
};

const plansBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: "مشاهده ی طرح ها", url: "https://t.me/radegozine_services" }],
    ],
  },
};

const contactWithAdminBtn = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: "ارتباط با مدیر", url: "https://t.me/onlineabedini" }],
    ],
  },
};

module.exports = {
  mainButtonsText,
  AdminsStartBtns,
  AdvisersStartBtns,
  StudentsStartBtns,
  manageAdminsBtns,
  manageAdvisersBtns,
  answerBtn,
  confidenceBtn,
  cancelAdviserAnswerBtn,
  cancelBtn,
  backBtn,
  plansBtn,
  contactWithAdminBtn,
  addAdminCancelBtn,
  removeAdminCancelBtn,
  addAdviserCancelBtn,
  removeAdviserCancelBtn,
};
