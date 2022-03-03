//import our models
const ChannelModel = require('../../models/Channel.js');
const {force_join_message, bot_is_not_a_member_of_any_channels_message} = require("../../messages/similar_messages");

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
                    return await ctx.reply(force_join_message(channelUserNames));
                }
            }
            return next();
        } else {
            return ctx.reply(bot_is_not_a_member_of_any_channels_message);
        }
    } else return next()
}



