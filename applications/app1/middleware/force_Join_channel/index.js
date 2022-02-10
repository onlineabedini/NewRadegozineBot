//import our models
const ChannelModel = require('../../models/Channel.js');
const {forceJoinMessage} = require("../../messages/similarMessages");

module.exports = async (ctx, next) => {
    if (ctx.message) {
        //collect the channel ids from database
        const channelsData = await ChannelModel.find()
        const channelsIds = channelsData.map(channel => channel.channelChatId);
        if (channelsIds.length !== 0) {
            //checked user is joined to the channels or not
            for (let id in channelsIds) {
                const membershipStatus = (await ctx.telegram.getChatMember(channelsIds[id], ctx.from.id)).status;
                if (membershipStatus !== 'creator' && membershipStatus !== 'administrator' && membershipStatus !== 'member') {
                    const channelUserNames = channelsData.map(channel => channel.channelUserName);
                    return await ctx.reply(forceJoinMessage(channelUserNames));
                }
            }
            return next();
        } else {
            return ctx.reply("بات عضو کانالی نیست");
        }
    } else return next()
}



