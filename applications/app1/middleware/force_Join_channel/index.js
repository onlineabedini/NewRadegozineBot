//import our models
const ChannelModel = require('../../models/Channel.js');

module.exports = async (ctx, next) => {
    //collect the channel ids from database
    const channelsData = await ChannelModel.find()
    const channelsIds = channelsData.map(channel => channel.channelChatId);
    //checked user is joined to the channels or not
    for (let id in channelsIds) {
        const membershipStatus = (await ctx.telegram.getChatMember(channelsIds[id], ctx.from.id)).status;
        if (membershipStatus !== 'creator' && membershipStatus !== 'administrator' && membershipStatus !== 'member') {
            return await ctx.reply(`برای استفاده از این ربات باید در کانال زیر عضو شوید @radgoz`);
        }
    }
    return next();
};



