const { all_buttons_text } = require("../../buttons/all_buttons_text");
const {
  contact_with_admin,
} = require("../../buttons/similar_buttons/contact_with_admin");
const {
  contact_with_developer,
} = require("../../buttons/similar_buttons/contact_with_developer");

module.exports = {
  [all_buttons_text.contact_with_admin]: async (ctx) => {
    ctx.session.state = undefined;
    ctx.reply("ارتباط با ادمین", contact_with_admin);
  },
  [all_buttons_text.contact_with_developer]: async (ctx) => {
    ctx.session.state = undefined;
    ctx.reply("ارتباط با توسعه دهنده", contact_with_developer);
  },
};
