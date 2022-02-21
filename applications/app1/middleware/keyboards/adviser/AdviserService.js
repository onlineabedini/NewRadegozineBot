//import models
const AdviserModel = require("../../../models/Adviser");
const StudentModel = require("../../../models/Questioner");

//import stateList
const stateList = require("../../stateList");

//import buttons
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {user_start_buttons} = require("../../../buttons/user_buttons/user_start_buttons");

//import messages
const {
    enter_your_message,
} = require("../../../messages/similarMessages");
const {you_have_been_removed_message} = require("../../../messages/similarMessages");

//define AdviserService class
// create an instance
module.exports = new class AdviserService {
    async send_message_for_admins(ctx, next) {
        let adviser = await AdviserModel.findOne({userChatId: ctx.message.chat.id});
        if (adviser) {
            ctx.session.state = stateList.sendMessageForAdmins;
            await ctx.reply(enter_your_message, cancel_button);
        } else {
            ctx.reply(you_have_been_removed_message, user_start_buttons);
        }
    }
}