const {all_buttons_text} = require("../../buttons/all_buttons_text");
const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const ProStudentModel = require("../../models/ProStudent");
const UserModel = require("../../models/User");
const QuestionModel = require("../../models/Question");
const ChannelModel = require("../../models/Channel");
const {statistics_message} = require("../../messages/admin_messages");

module.exports = {
    [all_buttons_text.bot_statistics]: async (ctx) => {
        ctx.session.state = undefined;
        const admins = await AdminModel.find();
        const advisers = await AdviserModel.find({is_accepted: true});
        const students = await ProStudentModel.find({is_pro: true});
        const users = await UserModel.find();
        const questions = await QuestionModel.find();
        const channels = await ChannelModel.find();

        const admins_ids = admins.map((admin) => admin.chat_id);
        const advisers_ids = advisers.map((adviser) => adviser.chat_id);
        const students_ids = students.map((student) => student.chat_id);
        const ids = [...admins_ids, ...advisers_ids, ...students_ids];
        const not_user = users.filter((user) => ids.includes(user.chat_id));

        const admins_count = admins.length;
        const advisers_count = advisers.length;
        const students_count = students.length;
        const users_count = users.length - not_user.length;

        const questions_count = questions.length;
        const channels_count = channels.length;
        const all_members_count = admins_count + advisers_count + students_count + users_count;

        const statistics = {
            all_members_count, admins_count, advisers_count, students_count, questions_count, channels_count,
        };
        await ctx.reply(statistics_message(statistics));
    },
}