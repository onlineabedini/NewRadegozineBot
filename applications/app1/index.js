// modules require
// packages
const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const KeyboardMiddleware = require("./middleware/keyboards");
const InlineKeyboardMiddleware = require("./middleware/inline-keyboards");
const SessionMiddleware = require("./middleware/sessions");

// modules
// Note : update this requires base on changes
let bot;

// classes + objects of them
const getLogs = require("./mainfunctions/startBot/getLog");
let getUserLog = new getLogs();

const roleSelect = require("./mainfunctions/startBot/roleSelect");
let roleSelector = new roleSelect();

// bot token
const BOT_TOKEN = "5206753052:AAFVVNl5OnKkkmYJ98tAM74bYCwPUzILSbQ";

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
    roleSelector.role_selector(ctx);
    getUserLog.get_user_start();
  });
}

module.exports.startBot = startBot;
