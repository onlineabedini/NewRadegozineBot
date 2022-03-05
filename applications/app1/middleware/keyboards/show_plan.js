const { all_buttons_text } = require("../../buttons/all_buttons_text");
const {show_plans_button,} = require("../../buttons/similar_buttons/show_plans_button");

module.exports = {
  [all_buttons_text.show_plans]: async (ctx) => {
    ctx.session.state = undefined;
    ctx.reply("نمایش طرح ها", show_plans_button);
  },
};
