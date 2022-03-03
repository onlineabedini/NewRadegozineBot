const {all_buttons_text} = require("../../buttons/all_buttons_text");

module.exports = {
    [all_buttons_text.contact_with_admin]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply("https://t.me/onlineabedini");
    },
    [all_buttons_text.contact_with_developer]: async (ctx) => {
        await ctx.reply("https://t.me/onlineabedini");
    }
}