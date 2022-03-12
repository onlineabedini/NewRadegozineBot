const { convert_array_to_n_column } = require("../../utils/convert_array_to_n_column");

module.exports.force_join_buttons = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [
                ...convert_array_to_n_column(data, 1).map((item) =>
                    item.map((item) => ({
                        text: item.title,
                        url: `https://t.me/${item.username}`,
                    }))
                ),
            ],
        },
    };
};
