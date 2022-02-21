// modules require
// packages
const {Telegraf} = require("telegraf");
const LocalSession = require("telegraf-session-local");
const winston = require("winston");
require("dotenv").config();

const ChatIdCollectorMiddleware = require("./middleware/chat_id_collector");
const ForceJoinChannelMiddleware = require("./middleware/force_Join_channel");
const KeyboardMiddleware = require("./middleware/keyboards");
const InlineKeyboardMiddleware = require("./middleware/inline_keyboards");
const SessionMiddleware = require("./middleware/sessions");


// modules
let bot;

// classes + objects of them
const getLogs = require("./mainfunctions/startBot/getLog");
let getUserLog = new getLogs();

const roleSelect = require("./mainfunctions/startBot/roleSelect");
const {something_went_wrong_please_try_again_message} = require("./messages/similarMessages");
let roleSelector = new roleSelect();

// start bot function
async function startBot() {
    bot = new Telegraf(process.env.BOT_TOKEN);
    await bot.launch();
    bot.use(new LocalSession({database: "session.json"}));


    //middleware
    bot.use(ChatIdCollectorMiddleware);
    bot.use(ForceJoinChannelMiddleware);
    bot.use(KeyboardMiddleware);
    bot.use(InlineKeyboardMiddleware);
    bot.use(SessionMiddleware);

    // err handler
    bot.catch((err, ctx) => {
        console.log(err);
        winston.error(err.message, err);
        ctx.reply(something_went_wrong_please_try_again_message);
        ctx.telegram.sendMessage(process.env.MAIN_ADMIN_ID, `خطایی رخ داده است متن خطا :
      ${err.message}`);
    });

    await bot.start((ctx) => {
        roleSelector.role_selector(ctx);
        getUserLog.get_user_start();
    });
}

module.exports.startBot = startBot;
