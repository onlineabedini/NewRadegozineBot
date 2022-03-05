const { convert_array_to_n_column } = require("../../utils/convert_array_to_n_column");

module.exports.plans_buttons = (data) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        ...convert_array_to_n_column(data, 2).map((item) =>
          item.map((item) => ({
            text: item.title,
            callback_data: `PLAN_${item._id}`,
          }))
        ),
      ],
    },
  };
};
