//import our models
const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const ProStudentModel = require("../../models/ProStudent");
const UserModel = require("../../models/User");
const QuestionerModel = require("../../models/Questioner");
const ChannelModel = require("../../models/Channel");
const PlanModel = require("../../models/Plan");
const ContentModel = require("../../models/Content");

//import states list
const stateList = require("../stateList");

//import all buttons texts
const { all_buttons_text } = require("../../buttons/all_buttons_text");

//import all buttons
const {
  manage_admins_buttons,
} = require("../../buttons/admin_buttons/manage_admins_buttons");
const {
  cancel_button,
} = require("../../buttons/similar_buttons/cancel_button");
const {
  manage_advisers_buttons,
} = require("../../buttons/admin_buttons/manage_advisers_buttons");
const {
  reg_adviser_register_buttons,
} = require("../../buttons/admin_buttons/reg_adviser_register_buttons");
const {
  manage_plans_buttons,
} = require("../../buttons/admin_buttons/manage_plans_buttons");
const {
  manage_pro_students_buttons,
} = require("../../buttons/admin_buttons/manage_pro_students_buttons");
const {
  update_remove_student_buttons,
} = require("../../buttons/admin_buttons/update_remove_student_buttons");
const {
  plans_buttons,
} = require("../../buttons/similar_buttons/plans_buttons");
const {
  update_and_remove_plan_buttons,
} = require("../../buttons/admin_buttons/update_remove_plan_buttons");

//import all messages
const {
  select_an_item_message,
  empty_list_message,
  enter_your_message,
} = require("../../messages/similar_messages");
const {
  admins_list_title_message,
  admins_list_message,
  no_admin_found_message,
  enter_new_admin_username_message,
  enter_admin_username_for_remove_message,
  advisers_list_title_message,
  advisers_list_message,
  no_adviser_found_message,
  reg_advisers_list_title_message,
  reg_adviser_info_message,
  no_one_has_registered_recently,
  enter_new_adviser_username_message,
  enter_adviser_username_for_remove_message,
  promote_adviser_message,
  demote_adviser_message,
  pro_student_caption,
  no_student_found_message,
  select_your_plan_message,
  no_plan_found_message,
  plan_caption,
  no_plan_registered_message,
  show_advisers_questions_list_message,
  enter_plan_title_message,
  statistics_message,
  content_caption,
} = require("../../messages/admin_messages");
const {
  send_message_buttons,
} = require("../../buttons/admin_buttons/send_message_buttons");
const {
  manage_content_production_buttons,
} = require("../../buttons/admin_buttons/manage_content_production_buttons");
const {
  management_menu_buttons,
} = require("../../buttons/admin_buttons/management_menu_buttons");
const {
  messages_list_buttons,
} = require("../../buttons/admin_buttons/messages_list_buttons");
const {
  update_and_remove_content_buttons,
} = require("../../buttons/admin_buttons/update_remove_content");
const { manage_messages_buttons } = require("../../buttons/admin_buttons/manage_messages_buttons");

module.exports = {
  [all_buttons_text.manage_admins]: async (ctx) => {
    ctx.session.state = undefined;
    ctx.reply(select_an_item_message, manage_admins_buttons);
  },
  [all_buttons_text.show_admins_list]: async (ctx) => {
    ctx.session.state = undefined;
    const admins = await AdminModel.find();
    if (admins.length !== 0) {
      await ctx.reply(admins_list_title_message);
      ctx.reply(admins_list_message(admins));
    } else {
      ctx.reply(no_admin_found_message, manage_admins_buttons);
    }
  },
  [all_buttons_text.add_admin]: async (ctx) => {
    ctx.session.state = stateList.addAdmin;
    await ctx.reply(enter_new_admin_username_message, cancel_button);
  },
  [all_buttons_text.remove_admin]: async (ctx) => {
    ctx.session.state = stateList.removeAdmin;
    await ctx.reply(enter_admin_username_for_remove_message, cancel_button);
  },

  [all_buttons_text.manage_advisers]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(select_an_item_message, manage_advisers_buttons);
  },
  [all_buttons_text.show_advisers_list]: async (ctx) => {
    ctx.session.state = undefined;
    const advisers = await AdviserModel.find({ isAccepted: true });
    if (advisers.length !== 0) {
      await ctx.reply(advisers_list_title_message);
      ctx.reply(advisers_list_message(advisers));
    } else {
      ctx.reply(no_adviser_found_message, manage_advisers_buttons);
    }
  },
  [all_buttons_text.show_reg_advisers_list]: async (ctx) => {
    ctx.session.state = undefined;
    const regAdvisers = await AdviserModel.find({ IsRegistered: true });
    await ctx.reply(reg_advisers_list_title_message);
    if (regAdvisers.length !== 0) {
      regAdvisers.forEach((regAdviser) => {
        ctx.reply(
          reg_adviser_info_message(regAdviser),
          reg_adviser_register_buttons(regAdviser._id)
        );
      });
    } else {
      ctx.reply(no_one_has_registered_recently, manage_advisers_buttons);
    }
  },
  [all_buttons_text.add_adviser]: async (ctx) => {
    ctx.session.state = stateList.addAdviser;
    await ctx.reply(enter_new_adviser_username_message, cancel_button);
  },
  [all_buttons_text.remove_adviser]: async (ctx) => {
    ctx.session.state = stateList.removeAdviser;
    await ctx.reply(enter_adviser_username_for_remove_message, cancel_button);
  },
  [all_buttons_text.promote_adviser]: async (ctx) => {
    ctx.session.state = stateList.promoteAdviser;
    await ctx.reply(promote_adviser_message, cancel_button);
  },
  [all_buttons_text.demote_adviser]: async (ctx) => {
    ctx.session.state = stateList.demoteAdviser;
    await ctx.reply(demote_adviser_message, cancel_button);
  },

  [all_buttons_text.manage_pro_students]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(select_an_item_message, manage_pro_students_buttons);
  },
  [all_buttons_text.show_update_remove_students]: async (ctx) => {
    ctx.session.state = undefined;
    const students = await ProStudentModel.find();
    if (students.length !== 0) {
      students.forEach(async (student) => {
        ctx.reply(
          await pro_student_caption(student),
          update_remove_student_buttons(student._id)
        );
      });
    } else {
      await ctx.reply(no_student_found_message, manage_pro_students_buttons);
    }
  },
  [all_buttons_text.add_student]: async (ctx) => {
    ctx.session = undefined;
    const plans = await PlanModel.find();
    if (plans.length !== 0) {
      const tempMessage = await ctx.reply(
        select_your_plan_message,
        plans_buttons(plans)
      );
      ctx.session.chatId = tempMessage.chat.id;
      ctx.session.messageId = tempMessage.message_id;
    } else await ctx.reply(no_plan_found_message, manage_pro_students_buttons);
  },

  [all_buttons_text.manage_plans]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(select_an_item_message, manage_plans_buttons);
  },
  [all_buttons_text.show_update_remove_plans]: async (ctx) => {
    ctx.session.state = undefined;
    const plans = await PlanModel.find();
    if (plans.length !== 0) {
      plans.forEach((plan) => {
        ctx.replyWithPhoto(
          { source: plan.planImage },
          {
            caption: plan_caption(plan),
            reply_markup: update_and_remove_plan_buttons(plan._id),
          }
        );
      });
    } else {
      ctx.reply(no_plan_registered_message, manage_plans_buttons);
    }
  },
  [all_buttons_text.add_plan]: async (ctx) => {
    ctx.session.state = stateList.getPlanTitle;
    await ctx.reply(enter_plan_title_message, cancel_button);
  },
  [all_buttons_text.manage_messages]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(select_an_item_message, manage_messages_buttons);
  },
  [all_buttons_text.messages_list]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(select_an_item_message, messages_list_buttons);
  },
  [all_buttons_text.manage_content_production]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(
      select_an_item_message,
      manage_content_production_buttons
    );
  },
  [all_buttons_text.show_update_remove_content]: async (ctx) => {
    ctx.session.state = undefined;
    const contents = await ContentModel.find();
    if (contents.length !== 0) {
      contents.forEach((content) => {
        ctx.reply(content_caption(content), {
          reply_markup: update_and_remove_content_buttons(content._id),
        });
      });
    } else {
      ctx.reply(
        "عنوانی برای تولید محتوا ثبت نشده است.",
        manage_content_production_buttons
      );
    }
  },
  [all_buttons_text.add_content_title]: async (ctx) => {
    ctx.session.state = stateList.getContentTitle;
    ctx.session.status = "create";
    await ctx.reply(
      "لطفا عنوان مورد نظر حهت تولید محتوا را وارد نمایید :",
      cancel_button
    );
  },
  [all_buttons_text.send_message]: async (ctx) => {
    ctx.session.state = undefined;
    await ctx.reply(select_an_item_message, send_message_buttons);
  },
  [all_buttons_text.send_message_for_channels]: async (ctx) => {
    ctx.session.state = stateList.sendMessageForChannels;
    await ctx.reply(enter_your_message, cancel_button);
  },
  [all_buttons_text.send_message_for_advisers]: async (ctx) => {
    ctx.session.state = stateList.sendMessageForAdvisers;
    await ctx.reply(enter_your_message, cancel_button);
  },
  [all_buttons_text.send_message_for_users]: async (ctx) => {
    ctx.session.state = stateList.sendMessageForAllUsers;
    await ctx.reply(enter_your_message, cancel_button);
  },
  [all_buttons_text.show_advisers_questions_list]: async (ctx) => {
    ctx.session.state = undefined;

    const advisersData = await AdviserModel.find();
    const advisersIds = advisersData.map((adviser) => adviser.id);

    if (advisersIds.length !== 0) {
      await ctx.reply(show_advisers_questions_list_message);
      for (const item in advisersIds) {
        let adviser = await AdviserModel.findOne({ _id: advisersIds[item] });
        let messagesIds = adviser.messagesIds;
        if (messagesIds.length !== 0) {
          for (const item in messagesIds) {
            await ctx.telegram.forwardMessage(
              ctx.message.chat.id,
              adviser.userChatId,
              messagesIds[item]
            );
          }
          return;
        }
      }
      await ctx.reply(empty_list_message);
    } else {
      await ctx.reply(empty_list_message);
    }
  },
  [all_buttons_text.bot_statistics]: async (ctx) => {
    ctx.session.state = undefined;
    const admins = await AdminModel.find();
    const advisers = await AdviserModel.find({ isAccepted: true });
    const students = await ProStudentModel.find({ isPro: true });
    const users = await UserModel.find();
    const questioners = await QuestionerModel.find();
    const channels = await ChannelModel.find();

    const admins_ids = admins.map((admin) => admin.userChatId);
    const advisers_ids = advisers.map((adviser) => adviser.userChatId);
    const students_ids = students.map((student) => student.userChatId);
    const ids = [...admins_ids, ...advisers_ids, ...students_ids];
    const not_user = users.filter((user) => ids.includes(user.userChatId));

    const admins_count = admins.length;
    const advisers_count = advisers.length;
    const students_count = students.length;
    const users_count = users.length - not_user.length;

    const questioners_count = questioners.length;
    const channels_count = channels.length;
    const all_members_count =
      admins_count + advisers_count + students_count + users_count;

    const statistics = {
      all_members_count,
      admins_count,
      advisers_count,
      students_count,
      questioners_count,
      channels_count,
    };
    await ctx.reply(statistics_message(statistics));
  },
};
