//import models
const AdviserModel = require("../../../models/Adviser");

//import buttons
const {cancelButtonText} = require('../../../buttons/similarButtons/cancelButton')
const {adviserStartButtons} = require("../../../buttons/adviserButtons/adviserStartButtons");

//import messages
const {messageSent,} = require("../../../messages/similarMessages");

//define AdviserService class
// create an instance
module.exports = new class AdviserService {
    async sendMessageForAdmins(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== cancelButtonText.cancel) {
            let adviser = await AdviserModel.findOne({userChatId: ctx.message.chat.id});
            adviser.userName = ctx.message.chat.username;
            adviser.messagesIds.push(ctx.message.message_id);
            adviser.save();
            await ctx.reply(messageSent, adviserStartButtons);
        }
    }
}
