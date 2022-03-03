// modules require
// packages
const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const winston = require("winston");
require("dotenv").config();

//import middleware
const chat_id_collector_middleware = require("./middleware/chat_id_collector");
const force_join_channel_middleware = require("./middleware/force_Join_channel");
const keyboard_middleware = require("./middleware/keyboards");
const inline_keyboard_middleware = require("./middleware/inline_keyboards");
const session_middleware = require("./middleware/sessions");

// modules
let bot;

// classes + objects of them
const getLogs = require("./mainfunctions/startBot/getLog");
let getUserLog = new getLogs();

const roleSelect = require("./mainfunctions/startBot/roleSelect");
const {
  something_went_wrong_please_try_again_message,
} = require("./messages/similar_messages");
let roleSelector = new roleSelect();

// start bot function
async function startBot() {
  bot = new Telegraf(process.env.BOT_TOKEN);
  await bot.launch();
  bot.use(new LocalSession({ database: "session.json" }));

  //use middleware
  bot.use(chat_id_collector_middleware);
  bot.use(force_join_channel_middleware);
  bot.use(keyboard_middleware);
  bot.use(inline_keyboard_middleware);
  bot.use(session_middleware);

  // err handler
  bot.catch((err, ctx) => {
    console.log(err);
    winston.error(err.message, err);
    ctx.reply(something_went_wrong_please_try_again_message);
    ctx.telegram.sendMessage(
      process.env.MAIN_ADMIN_ID,
      `خطایی رخ داده است متن خطا :
      ${err.message}`
    );
  });

  await bot.start((ctx) => {
    roleSelector.role_selector(ctx);
    getUserLog.get_user_start();
  });
}

module.exports.startBot = startBot;
