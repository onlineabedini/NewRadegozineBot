const Admin = require("../../../models/Admin");
const Adviser = require("../../../models/Adviser");
const Users = require("../../../models/User");
const stateList = require('../../stateList')

const {
 mainButtonsText,
  AdminsStartBtns,
  manageAdminsBtns,
  manageAdvisersBtns,
} = require("../../../buttons/ButtonManager");

const {
  ENTERADMINFULLNAME,
  ENTERADVISERFULLNAME,
  ADMINCONFIRMMESSAGE,
  ADVISERCONFIRMMESSAGE,
  DUPLICATEADMIN,
  DUPLICATEADVISER,
  SENDMESSAGEFORADVISERSWASSUCCESSFUL,
  SENDMESSAGEFORSTUDENTSWASSUCCESSFUL,
  ENTERTEXTONLY,
  ADMINNOTFOUND,
  ADVISERNOTFOUND,
  STUDENTNOTFOUND,
  NOADVISERADDED,
  ADMINREMOVED,
  ADVISERREMOVED,
  INVALIDUSERNAME,
} = require("../../../messages/MessageHandler");

module.exports = new class AdminService {
  async addAdmin(ctx, next) {
      ctx.session.state = undefined;
      if (ctx.message && ctx.message.text !== mainButtonsText.addAdminCancel) {
        if (ctx.message.text) {
          const InputText = ctx.message.text;
          const AdminUsername = InputText.split("@")[1];
          if (AdminUsername) {
            ctx.session.stateData = { ...ctx.session.stateData, AdminUsername };
            ctx.session.state = stateList.GETADMINFULLNAME;
            await ctx.reply(ENTERADMINFULLNAME);
          } else {
            ctx.reply(INVALIDUSERNAME, manageAdminsBtns);
          }
        } else {
          await ctx.reply(ENTERTEXTONLY, manageAdminsBtns);
        }
      } else next();
    }

    async removeAdmin(ctx, next) {
      ctx.session.state = undefined;
      if (
          ctx.message &&
          ctx.message.text !== mainButtonsText.removeAdminCancel
      ) {
        if (ctx.message.text) {
          const InputText = ctx.message.text;
          const AdminUsername = InputText.split("@")[1];
          const admin = await Admin.findOne({ Username: AdminUsername });
          if (admin) {
            await Admin.findOneAndDelete({ Username: AdminUsername });
            await ctx.reply(ADMINREMOVED, manageAdminsBtns);
          } else {
            await ctx.reply(ADMINNOTFOUND, manageAdminsBtns);
          }
        } else {
          await ctx.reply(ENTERTEXTONLY, manageAdminsBtns);
        }
      } else next();
    }

    async getAdminFullName(ctx , next){
      ctx.session.state = undefined;
      if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
        if (ctx.message.text) {
          const AdminFullname = ctx.message.text;
          ctx.session.stateData = { ...ctx.session.stateData, AdminFullname };
          const AdminData = await Admin.findOne({
            Username: ctx.session.stateData.AdminUsername,
          });
          if (!AdminData) {
            AddNewAdmin();
            await ctx.reply(ADMINCONFIRMMESSAGE, AdminsStartBtns);
          } else {
            await ctx.reply(DUPLICATEADMIN, AdminsStartBtns);
          }

          function AddNewAdmin() {
            const admin = new Admin({
              Username: ctx.session.stateData.AdminUsername,
              Fullname: ctx.session.stateData.AdminFullname,
            });
            admin.save();
          }

          ctx.session.stateData = undefined;
        } else {
          await ctx.reply(ENTERTEXTONLY, manageAdminsBtns);
        }
      } else next();
    }

  async addAdviser(ctx, next) {
    ctx.session.state = undefined;
    if (
        ctx.message &&
        ctx.message.text !== mainButtonsText.addAdviserCancel
    ) {
      if (ctx.message.text) {
        const InputText = ctx.message.text;
        const AdviserUsername = InputText.split("@")[1];
        if (AdviserUsername) {
          ctx.session.stateData = { ...ctx.session.stateData, AdviserUsername };
          ctx.session.state = stateList.GETADVISERFULLNAME;
          await ctx.reply(ENTERADVISERFULLNAME);
        } else {
          ctx.reply(INVALIDUSERNAME, manageAdvisersBtns);
        }
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdvisersBtns);
      }
    } else next();
  }
  async removeAdviser(ctx , next){
    ctx.session.state = undefined;
    if (
        ctx.message &&
        ctx.message.text !== mainButtonsText.removeAdviserCancel
    ) {
      if (ctx.message.text) {
        const InputText = ctx.message.text;
        const AdviserUsername = InputText.split("@")[1];
        const adviser = await Adviser.findOne({ Username: AdviserUsername });
        if (adviser) {
          await Adviser.findOneAndDelete({ Username: AdviserUsername });
          await ctx.reply(ADVISERREMOVED, manageAdvisersBtns);
        } else {
          await ctx.reply(ADVISERNOTFOUND, manageAdvisersBtns);
        }
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdvisersBtns);
      }
    } else next();
  }
  async getAdviserFullName(ctx,next){
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
      if (ctx.message.text) {
        const AdviserFullname = ctx.message.text;
        ctx.session.stateData = { ...ctx.session.stateData, AdviserFullname };
        const AdviserData = await Adviser.findOne({
          Username: ctx.session.stateData.AdviserUsername,
        });

        if (!AdviserData) {
          AddNewAdviser();
          await ctx.reply(ADVISERCONFIRMMESSAGE, AdminsStartBtns);
        } else {
          await ctx.reply(DUPLICATEADVISER, AdminsStartBtns);
        }

        function AddNewAdviser() {
          const adviser = new Adviser({
            Username: ctx.session.stateData.AdviserUsername,
            Fullname: ctx.session.stateData.AdviserFullname,
          });
          adviser.save();
        }

        ctx.session.stateData = undefined;
      } else {
        await ctx.reply(ENTERTEXTONLY, manageAdvisersBtns);
      }
    } else next();
  }

  async sendMessageForAdvisers(ctx , next){
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
      const AdvisersData = await Adviser.find();
      const AdvisersId = AdvisersData.map((element) => element.id);
      if (AdvisersId.length !== 0) {
        for (let item in AdvisersId) {
          let adviser = await Adviser.findOne({ _id: AdvisersId[item] });
          const ChatId = adviser.ChatId;
          if (ChatId) {
            const MessageId = ctx.message.message_id;
            await ctx.telegram.forwardMessage(
                ChatId,
                ctx.message.chat.id,
                MessageId
            );
          } else {
            console.log(
                `the username (${adviser.Username}) has not started the bot or does not exist`
            );
          }
        }
        await ctx.reply(SENDMESSAGEFORADVISERSWASSUCCESSFUL, AdminsStartBtns);
      } else {
        await ctx.reply(NOADVISERADDED, AdminsStartBtns);
      }
    } else next();
  }

  async sendMessageForStudents(ctx , next){
    ctx.session.state = undefined;
    if (ctx.message && ctx.message.text !== mainButtonsText.cancel) {
      const UserData = await Users.find();
      const UsersChatIds = UserData.map((element) => element.ChatId);
      if (UsersChatIds.length !== 0) {
        const MessageId = ctx.message.message_id;
        for (let item in UsersChatIds) {
          await ctx.telegram.forwardMessage(
              UsersChatIds[item],
              ctx.message.chat.id,
              MessageId
          );
        }
        ctx.reply(SENDMESSAGEFORSTUDENTSWASSUCCESSFUL, AdminsStartBtns);
      } else {
        await ctx.reply(STUDENTNOTFOUND, AdminsStartBtns);
      }
    } else next();
  }

}
