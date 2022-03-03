const state_list = require("../state_list");

const {confidence_buttons} = require("../../buttons/similar_buttons/confidence_buttons");

const {
    do_you_want_to_accept_this_adviser_message,
    do_you_want_to_remove_this_adviser_message
} = require("../../messages/admin_messages");

module.exports = {
    ACC_ADVISER: async (ctx, matches) => {
        const regAdviserId = matches[0].split("_")[2];
        await ctx.reply(
            do_you_want_to_accept_this_adviser_message,
            confidence_buttons
        );
        ctx.session.regAdviserId = regAdviserId;
        ctx.session.state = state_list.accept_adviser;
    },
    REJ_ADVISER: async (ctx, matches) => {
        const regAdviserId = matches[0].split("_")[2];
        await ctx.reply(
            do_you_want_to_remove_this_adviser_message,
            confidence_buttons
        );
        ctx.session.regAdviserId = regAdviserId;
        ctx.session.state = state_list.reject_adviser;
    },
}