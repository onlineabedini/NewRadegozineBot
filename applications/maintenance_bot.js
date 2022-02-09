const { Telegraf } = require("telegraf");
// start bot function
module.exports = class maintenance_bot{
    constructor(){
        this.maintenance_bot()
    }

    async maintenance_bot() {
        console.log("maintenance_bot is running")
        const bot = new Telegraf('5016211213:AAHPhaaTRo-ezEOoieUfTSWcNwdNUM8gX3s');
      
        bot.start((ctx) => {
              ctx.reply("بات ردگزینه بصورت موقت در دسترس نیست، لطفا بعدا تلاش کنید");
        });
        
        bot.use((ctx) => {
              ctx.reply("بات ردگزینه بصورت موقت در دسترس نیست، لطفا بعدا تلاش کنید");
        })
        
        await bot.launch();
    }
}
