//import our models
const ChannelModel = require('../../models/Channel.js');
const {force_join_message, bot_is_not_a_member_of_any_channels_message} = require("../../messages/similar_messages");

module.exports = async (ctx, next) => {
    if (ctx.message) {
        //collect the channel ids from database
        const channels = await ChannelModel.find()
        const channels_ids = channels.map(channel => channel.chat_id);
        if (channels_ids.length !== 0) {
            //checked user is joined to the channels or not
            for (let id in channels_ids) {
                const membership_status = (await ctx.telegram.getChatMember(channels_ids[id], ctx.from.id)).status;
                if (membership_status !== 'creator' && membership_status !== 'administrator' && membership_status !== 'member') {
                    const channel_usernames = channels.map(channel => channel.username);
                    return await ctx.reply(force_join_message(channel_usernames));
                }
            }
            return next();
        } else {
            return ctx.reply(bot_is_not_a_member_of_any_channels_message);
        }
    } else return next()
}



