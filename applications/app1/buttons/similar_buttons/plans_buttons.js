const { convertArrayToNColumn } = require("../../utils/convertArrayToNColumn");

module.exports.plans_buttons = (data) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        ...convertArrayToNColumn(data, 2).map((item) =>
          item.map((item) => ({
            text: item.title,
            callback_data: `PLAN_${item._id}`,
          }))
        ),
      ],
    },
  };
};
