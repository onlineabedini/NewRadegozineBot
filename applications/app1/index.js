// modules require
// packages
const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const SessionMiddleware = require("./middleware/sessions");
const KeyboardMiddleware = require("./middleware/keyboards");
const InlineKeyboardMiddleware = require("./middleware/inline-keyboards");

// modules
// Note : update this requires base on changes
const {
  AdminsStartBtns,
  AdvisersStartBtns,
  StudentsStartBtns,
} = require("./buttons/ButtonManager");
const {
  STARTMESSAGEFORADMIN,
  STARTMESSAGEFORADVISER,
  STARTMESSAGEFORSTUDENT,
} = require("./messages/MessageHandler");
const Admin = require("./models/Admin.js");
const Adviser = require("./models/Adviser");
const User = require("./models/User");
let bot;

// classes + objects of them
const getLogs = require("./mainfunctions/startBot/getLog");
let getUserLog = new getLogs();

const roleSelect = require("./mainfunctions/startBot/roleSelect");
let roleSelector = new roleSelect();

// bot token
const BOT_TOKEN = "5206753052:AAFVVNl5OnKkkmYJ98tAM74bYCwPUzILSbQ";
const mainInfo = {
  MainAdminUsername: "siralinpr",
  ChannelChatId: -1001644994780,
};

// start bot function
async function startBot() {
  bot = new Telegraf(BOT_TOKEN);
  await bot.launch();
  bot.use(new LocalSession({ database: "session.json" }));

  // middleware
  // bot.use((ctx , next)=>{
  //   console.log(ctx.update.my_chat_member.chat)
  // })
  bot.use(KeyboardMiddleware);
  bot.use(InlineKeyboardMiddleware);
  bot.use(SessionMiddleware);

  // bot start ctx
  await bot.start((ctx) => {
    // delete this
    RoleSelector(ctx);

    getUserLog.get_user_start();
    roleSelector.Role_selector();
  });

  // functions
  // role selector
  /* 
    Note : please put this directory in its own file
  */
  async function RoleSelector(ctx) {
    const AdminData = await Admin.find();
    const AdminsUsernames = AdminData.map((element) => element.Username);
    const AdviserData = await Adviser.find();
    const AdvisersUsernames = AdviserData.map((element) => element.Username);
    if (ctx.message.from.username === mainInfo.MainAdminUsername) {
      const mainAdmin = await Admin.findOne({
        Username: ctx.message.from.username,
      });
      if (!mainAdmin) {
        AddMainAdmin();
        function AddMainAdmin() {
          const mainAdmin = new Admin({
            Username: ctx.message.from.username,
            Fullname: "Main Admin",
          });
          mainAdmin.save();
        }
        await ctx.reply(STARTMESSAGEFORADMIN, AdminsStartBtns);
      } else {
        await ctx.reply(STARTMESSAGEFORADMIN, AdminsStartBtns);
      }
    } else if (AdminsUsernames.includes(ctx.message.from.username)) {
      await ctx.reply(STARTMESSAGEFORADMIN, AdminsStartBtns);
    } else if (AdvisersUsernames.includes(ctx.message.from.username)) {
      let adviser = await Adviser.findOne({
        Username: ctx.message.from.username,
      });
      adviser.ChatId = ctx.message.chat.id;
      await adviser.save();
      await ctx.reply(STARTMESSAGEFORADVISER, AdvisersStartBtns);
    } else {
      const UserData = await User.findOne({ ChatId: ctx.message.chat.id });
      if (!UserData) {
        AddUser();
        function AddUser() {
          const user = new User({
            ChatId: ctx.message.chat.id,
          });
          user.save();
        }
        await ctx.reply(STARTMESSAGEFORSTUDENT, StudentsStartBtns);
      } else await ctx.reply(STARTMESSAGEFORSTUDENT, StudentsStartBtns);
    }
  }
}

module.exports.startBot = startBot;
