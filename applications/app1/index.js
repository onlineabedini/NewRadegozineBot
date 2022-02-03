const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const SessionMiddleware = require("./middleware/SessionMiddleware");
const KeyboardMiddleware = require("./middleware/KeyboardMiddleware");
const ActionMiddleware = require("./middleware/ActionMiddleware");

// bot token 
const BOT_TOKEN = '5016211213:AAHPhaaTRo-ezEOoieUfTSWcNwdNUM8gX3s'
const mainInfo = {
  "MainAdminUsername": "radegozine_manager",
  "ChannelChatId": -1001312069430
}

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

async function startBot() {
  bot = new Telegraf(BOT_TOKEN);
  await bot.launch();
  bot.use(new LocalSession({ database: "session.json" }));

  //bot.use(Middleware)
  bot.use(KeyboardMiddleware);
  bot.use(SessionMiddleware);
  bot.use(ActionMiddleware);

  bot.start((ctx) => {
    RoleSelector();

    async function RoleSelector() {
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
  });
}

module.exports.startBot = startBot;
