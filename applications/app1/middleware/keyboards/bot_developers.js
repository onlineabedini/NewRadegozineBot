const {all_buttons_text} = require("../../buttons/all_buttons_text");
const {bot_developers_caption} = require("../../messages/similar_messages");

module.exports = {
    [all_buttons_text.bot_developers]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.replyWithPhoto({source: "static/img/irnode.jpg"}, {
            caption: bot_developers_caption,
        });
    },
}