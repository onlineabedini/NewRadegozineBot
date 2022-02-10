//import our model
const ChannelModel = require('../../models/Channel');

module.exports = async (ctx, next) => {
    if (ctx.update.my_chat_member) {
        //get this bot id
        const thisBotId = (await ctx.telegram.getMe()).id;

        //get new chat member id
        const newChatMemberUserId = ctx.update.my_chat_member.new_chat_member.user.id;

        //get the bot membership status
        const botMembershipStatus = ctx.update.my_chat_member.new_chat_member.status;

        if (botMembershipStatus === "administrator" && newChatMemberUserId === thisBotId) {
            const channelsIds = await ChannelModel.findOne({
                channelChatId: ctx.update.my_chat_member.chat.id
            })
            if (!channelsIds) {
                //create a new channel when the bot is added to a channel
                const newChannel = await new ChannelModel({
                    type: ctx.update.my_chat_member.chat.type,
                    channelTitle: ctx.update.my_chat_member.chat.title,
                    channelChatId: ctx.update.my_chat_member.chat.id,
                    channelUserName: ctx.update.my_chat_member.chat.username,
                })
                await newChannel.save();
            } else {
                //update the channel when the bot is added to a channel
                const updateChannelInfo = await ChannelModel.findOneAndUpdate({
                    channelChatId: ctx.update.my_chat_member.chat.id
                }, {
                    type: ctx.update.my_chat_member.chat.type,
                    channelTitle: ctx.update.my_chat_member.chat.title,
                    channelChatId: ctx.update.my_chat_member.chat.id,
                    channelUserName: ctx.update.my_chat_member.chat.username,
                }, {
                    new: true
                })
                await updateChannelInfo.save();
            }
        } else if (botMembershipStatus === "left" && newChatMemberUserId === thisBotId) {
            //delete the channel when the bot is removed from a channel
            await ChannelModel.findOneAndDelete({
                channelChatId: ctx.update.my_chat_member.chat.id
            });
        } else return next();
    } else return next()
}
