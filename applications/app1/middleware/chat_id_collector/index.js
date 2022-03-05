//import our model
const ChannelModel = require('../../models/Channel');

module.exports = async (ctx, next) => {
    if (ctx.update.my_chat_member) {
        //get this bot id
        const this_bot_id = (await ctx.telegram.getMe()).id;

        //get new chat member id
        const new_chat_member_user_id = ctx.update.my_chat_member.new_chat_member.user.id;

        //get the bot membership status
        const bot_membership_status = ctx.update.my_chat_member.new_chat_member.status;

        if (bot_membership_status === "administrator" && new_chat_member_user_id === this_bot_id) {
            const channel = await ChannelModel.findOne({
                chat_id: ctx.update.my_chat_member.chat.id
            })
            if (!channel) {
                //create a new channel when the bot is added to a channel
                const new_channel = await new ChannelModel({
                    type: ctx.update.my_chat_member.chat.type,
                    title: ctx.update.my_chat_member.chat.title,
                    chat_id: ctx.update.my_chat_member.chat.id,
                    username: ctx.update.my_chat_member.chat.username,
                })
                await new_channel.save();
            } else {
                //update the channel when the bot is added to a channel
                const update_channel_info = await ChannelModel.findOneAndUpdate({
                    chat_id: ctx.update.my_chat_member.chat.id
                }, {
                    type: ctx.update.my_chat_member.chat.type,
                    title: ctx.update.my_chat_member.chat.title,
                    chat_id: ctx.update.my_chat_member.chat.id,
                    username: ctx.update.my_chat_member.chat.username,
                }, {
                    new: true
                })
                await update_channel_info.save();
            }
        } else if (bot_membership_status === "left" && new_chat_member_user_id === this_bot_id) {
            //delete the channel when the bot is removed from a channel
            await ChannelModel.findOneAndDelete({
                chat_id: ctx.update.my_chat_member.chat.id
            });
        } else return next();
    } else return next()
}
