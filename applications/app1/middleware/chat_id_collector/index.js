//import our model
const ChannelModel = require('../../models/Channel');

module.exports = async (ctx, next) => {
    if (ctx.update.my_chat_member) {
        //get the bot id
        const botId = ctx.update.my_chat_member.new_chat_member.user.id;
        //get the bot membership status
        const botMembershipStatus = ctx.update.my_chat_member.new_chat_member.status;
        if (botMembershipStatus === "administrator" && botId === 5206753052) {
            //create a new channel when the bot is added to a channel
            const newChannel = await new ChannelModel({
                type: ctx.update.my_chat_member.chat.type,
                channelTitle: ctx.update.my_chat_member.chat.title,
                channelChatId: ctx.update.my_chat_member.chat.id,
                channelUserName: ctx.update.my_chat_member.chat.username,
            })
            await newChannel.save();
        } else if (botMembershipStatus === "left" && botId === 5206753052) {
            //delete the channel when the bot is removed from a channel
            await ChannelModel.findOneAndDelete({
                channelChatId: ctx.update.my_chat_member.chat.id
            });
        } else return next();
    } else return next()
}
