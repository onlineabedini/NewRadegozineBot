const Admin = require("../../../models/Admin");
const Adviser = require("../../../models/Adviser");

const {
  AdminsStartBtns,
  AdvisersStartBtns,
  StudentsStartBtns,
} = require("../../../buttons/ButtonManager");

const {
  REQUESTCANCELED,
  BOTDEVELOPERSCAPTION
} = require("../../../messages/MessageHandler");

module.exports = new class SameService {
  async cancel(ctx , next) {
    ctx.session.state = undefined;
    ctx.session.stateData = undefined;
    const admin = await Admin.findOne({ Username: ctx.message.chat.username });
    const adviser = await Adviser.findOne({
      Username: ctx.message.chat.username,
    });
    if (admin) {
      await ctx.reply(REQUESTCANCELED, AdminsStartBtns);
    } else if (adviser) {
      await ctx.reply(REQUESTCANCELED, AdvisersStartBtns);
    } else {
      await ctx.reply(REQUESTCANCELED, StudentsStartBtns);
    }
  }
  async botDevelopers(ctx , next){
    ctx.session.state = undefined;
    await ctx.replyWithPhoto(
        { source: "static/img/irnode.jpg" },
        {
          caption: BOTDEVELOPERSCAPTION,
        }
    );
  }
};