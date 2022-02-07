// modules require
// packages
const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const KeyboardMiddleware = require("./middleware/keyboards");
const InlineKeyboardMiddleware = require("./middleware/inline_keyboards");
const SessionMiddleware = require("./middleware/sessions");

// modules
let bot;

// classes + objects of them
const getLogs = require("./mainfunctions/startBot/getLog");
let getUserLog = new getLogs();

const roleSelect = require("./mainfunctions/startBot/roleSelect");
let roleSelector = new roleSelect();

// bot token
const BOT_TOKEN = '5016211213:AAHPhaaTRo-ezEOoieUfTSWcNwdNUM8gX3s';

// start bot function
async function startBot() {
  bot = new Telegraf(BOT_TOKEN);
  await bot.launch();
  bot.use(new LocalSession({ database: "session.json" }));

  // middleware
  // Don't remove this middleware
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
