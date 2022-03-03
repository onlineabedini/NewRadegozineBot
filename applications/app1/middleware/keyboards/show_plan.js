const {all_buttons_text} = require("../../buttons/all_buttons_text");

module.exports = {
    [all_buttons_text.show_plans]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply("https://t.me/radegozine_services");
    },
}