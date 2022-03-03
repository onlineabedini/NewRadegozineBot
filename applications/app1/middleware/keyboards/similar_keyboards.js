//import models
const AdminModel = require("../../models/Admin");
const AdviserModel = require("../../models/Adviser");
const ProStudentModel = require("../../models/ProStudent");
const QuestionerModel = require("../../models/Questioner");

//import state list 
const stateList = require("../stateList");

//import messages
const {
    select_an_item_message,
    your_request_has_been_canceled,
    botDevelopersCaption,
    questions_list_title_message,
    student_info_message,
    no_questions_to_show_message,
    select_field_for_sending_content_message,
    enter_content_message,
} = require("../../messages/similar_messages");

const {
    admin_start_buttons,
} = require("../../buttons/admin_buttons/admin_start_buttons");
const {
    adviser_start_buttons,
} = require("../../buttons/adviser_buttons/adviser_start_buttons");
const {
    pro_adviser_start_buttons,
} = require("../../buttons/adviser_buttons/pro_adviser_start_buttons");
const {
    student_start_buttons,
} = require("../../buttons/student_buttons/student_start_buttons");
const {
    user_start_buttons,
} = require("../../buttons/user_buttons/user_start_buttons");
const {
    answer_buttons,
} = require("../../buttons/similar_buttons/answer_buttons");
const {
    send_content_for_students,
} = require("../../buttons/similar_buttons/send_content_for_students");
const {
    cancel_button,
} = require("../../buttons/similar_buttons/cancel_button");
const {
    enter_field_buttons,
} = require("../../buttons/similar_buttons/enter_field_buttons");

//import buttons text
const {all_buttons_text} = require("../../buttons/all_buttons_text");

module.exports = {
    [all_buttons_text.send_content_for_students]: async (ctx) => {
        ctx.reply(select_an_item_message, send_content_for_students);
    }, [all_buttons_text.send_content_for_pro_students]: async (ctx) => {
        ctx.session.state = stateList.getFieldForSendContent;
        ctx.reply(select_field_for_sending_content_message, enter_field_buttons);
    }, [all_buttons_text.send_content_for_all_students]: async (ctx) => {
        ctx.session.state = stateList.sendContentForAllStudents;
        ctx.reply(enter_content_message, cancel_button);
    }, [all_buttons_text.cancel]: async (ctx, next) => {
        ctx.session = undefined;
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        const proAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, isPro: true,
        });
        const normalAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, isAccepted: true,
        });
        const proStudent = await ProStudentModel.findOne({
            userName: ctx.chat.username, isPro: true,
        });

        if (admin) {
            ctx.reply(your_request_has_been_canceled, admin_start_buttons);
        } else if (proAdviser) {
            ctx.reply(your_request_has_been_canceled, pro_adviser_start_buttons);
        } else if (normalAdviser) {
            ctx.reply(your_request_has_been_canceled, adviser_start_buttons);
        } else if (proStudent) {
            ctx.reply(your_request_has_been_canceled, student_start_buttons);
        } else {
            ctx.reply(your_request_has_been_canceled, user_start_buttons);
        }
    }, [all_buttons_text.back]: async (ctx) => {
        ctx.session = undefined;
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        const proAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, isPro: true,
        });
        const normalAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, isAccepted: true,
        });
        const proStudent = await ProStudentModel.findOne({
            userName: ctx.chat.username, isPro: true,
        });

        if (admin) {
            ctx.reply(select_an_item_message, admin_start_buttons);
        } else if (proAdviser) {
            ctx.reply(select_an_item_message, pro_adviser_start_buttons);
        } else if (normalAdviser) {
            ctx.reply(select_an_item_message, adviser_start_buttons);
        } else if (proStudent) {
            ctx.reply(select_an_item_message, student_start_buttons);
        } else {
            ctx.reply(select_an_item_message, user_start_buttons);
        }
    }, [all_buttons_text.show_plans]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply("https://t.me/radegozine_services");
    }, [all_buttons_text.contact_with_admin]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.reply("https://t.me/onlineabedini");
    }, [all_buttons_text.contact_with_developer]: async (ctx) => {
        await ctx.reply("https://t.me/onlineabedini");
    }, [all_buttons_text.bot_developers]: async (ctx) => {
        ctx.session.state = undefined;
        await ctx.replyWithPhoto({source: "static/img/irnode.jpg"}, {
            caption: botDevelopersCaption,
        });
    }, [all_buttons_text.show_users_questions_list]: async (ctx) => {
        ctx.session.state = undefined;
        const questioner = await QuestionerModel.find();
        if (questioner.length !== 0) {
            await ctx.reply(questions_list_title_message);
            questioner.forEach((student) => {
                ctx.reply(student_info_message(student), answer_buttons(student._id));
            });
        } else {
            ctx.reply(no_questions_to_show_message);
        }
    },
};
