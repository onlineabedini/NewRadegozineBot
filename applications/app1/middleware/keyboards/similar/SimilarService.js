//import models
const AdminModel = require("../../../models/Admin");
const AdviserModel = require("../../../models/Adviser");
const ProStudentModel = require("../../../models/ProStudent");
const QuestionerModel = require("../../../models/Questioner");

const stateList = require("../../stateList")

//import messages
const {
    selectAnItem, requestCanceled, botDevelopersCaption,
    questionsListTitle,
    studentInfoMessage,
} = require("../../../messages/similarMessages");
const {seePlansMessage, contactWithAdminMessage} = require("../../../messages/studentMessages");
const {admin_start_buttons} = require("../../../buttons/admin_buttons/admin_start_buttons");
const {adviser_start_buttons} = require("../../../buttons/adviser_buttons/adviser_start_buttons");
const {pro_adviser_start_buttons} = require("../../../buttons/adviser_buttons/pro_adviser_start_buttons");
const {student_start_buttons} = require("../../../buttons/student_buttons/student_start_buttons");
const {user_start_buttons} = require("../../../buttons/user_buttons/user_start_buttons");
const {show_plans_button} = require("../../../buttons/similar_buttons/show_plans_button");
const {contact_with_admin} = require("../../../buttons/similar_buttons/contact_with_admin");
const {answer_buttons} = require("../../../buttons/similar_buttons/answer_buttons");
const {send_content_for_students} = require("../../../buttons/similar_buttons/send_content_for_students");
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");
const {enter_field_buttons} = require("../../../buttons/similar_buttons/enter_field_buttons");
const {contact_with_developer} = require("../../../buttons/similar_buttons/contact_with_developer");

//define SimilarService class
module.exports = new class SimilarService {
    async send_content_for_students(ctx, next){
        ctx.reply("لطفا از لیست زیر یک مورد را انتخاب کنید : " , send_content_for_students)
    }

    async send_content_for_pro_students(ctx, next){
        ctx.session.state = stateList.getFieldForSendContent
        ctx.reply("لطفا رشته ی تحصیلی ای که قصد ارسال محتوا برای آن را دارید انتخاب نمایید : " , enter_field_buttons)
    }

    async send_content_for_all_students(ctx, next){
        ctx.session.state = stateList.sendContentForAllStudents
        ctx.reply("لطفا پیام حاوی محتوایی که قصد انتشار آنرا دارید برای بات ارسال کنید :  " , cancel_button)
    }

    async cancel(ctx, next) {
        ctx.session = undefined;
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        const proAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, isPro: true
        });
        const normalAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, isAccepted: true
        });
        const proStudent = await ProStudentModel.findOne({
            userName: ctx.chat.username, isPro: true
        });

        if (admin) {
            ctx.reply(requestCanceled, admin_start_buttons);
        } else if (proAdviser) {
            ctx.reply(requestCanceled, pro_adviser_start_buttons);
        } else if (normalAdviser) {
            ctx.reply(requestCanceled, adviser_start_buttons);
        } else if (proStudent) {
            ctx.reply(requestCanceled, student_start_buttons)
        } else {
            ctx.reply(requestCanceled, user_start_buttons)
        }
    }

    async back(ctx, next) {
        ctx.session = undefined;
        const admin = await AdminModel.findOne({userName: ctx.chat.username});
        const proAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, isPro: true
        });
        const normalAdviser = await AdviserModel.findOne({
            userName: ctx.chat.username, isAccepted: true
        });
        const proStudent = await ProStudentModel.findOne({
            userName: ctx.chat.username, isPro: true
        });

        if (admin) {
            ctx.reply(selectAnItem, admin_start_buttons);
        } else if (proAdviser) {
            ctx.reply(selectAnItem, pro_adviser_start_buttons);
        } else if (normalAdviser) {
            ctx.reply(selectAnItem, adviser_start_buttons);
        } else if (proStudent) {
            ctx.reply(selectAnItem, student_start_buttons)
        } else {
            ctx.reply(selectAnItem, user_start_buttons)
        }
    }

    async show_plans(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(seePlansMessage, show_plans_button);
    }

    async contact_with_admin(ctx, next) {
        ctx.session.state = undefined;
        await ctx.reply(contactWithAdminMessage, contact_with_admin);
    }

    async contact_with_developer(ctx, next) {
        await ctx.reply("ارتباط با توسعه دهنده" , contact_with_developer);
    }


    async bot_developers(ctx, next) {
        ctx.session.state = undefined;
        await ctx.replyWithPhoto(
            {source: "static/img/irnode.jpg"},
            {
                caption: botDevelopersCaption,
            }
        );
    }

    async show_users_questions_list(ctx, next) {
        ctx.session.state = undefined;
        const questioner = await QuestionerModel.find();
        if (questioner.length !== 0) {
            await ctx.reply(questionsListTitle)
            questioner.forEach((student) => {
                ctx.reply(studentInfoMessage(student), answer_buttons(student._id))
            })
        } else {
            ctx.reply("سوالی برای نمایش وجود ندارد")
        }
    }
};