const UserModel = require('../../../models/User');
const QuestionerModel = require('../../../models/Questioner');
const ProStudentModel = require('../../../models/ProStudent');
const ChannelModel = require('../../../models/Channel');

const {onlyVoiceMessage, voice_caption} = require("../../../messages/similarMessages");
const {auth_button} = require("../../../buttons/similar_buttons/auth_button");
const {channel_post_buttons} = require("../../../buttons/similar_buttons/channel_post_buttons");
const {yourQuestionAnswered} = require("../../../messages/studentMessages");
const {all_buttons_text} = require("../../../buttons/all_keyborad_text");
const stateList = require("../../stateList");
const {enter_field_buttons} = require("../../../buttons/similar_buttons/enter_field_buttons");
const {enter_grade_buttons} = require("../../../buttons/similar_buttons/enter_grade_buttons");
const {enter_level_buttons} = require("../../../buttons/similar_buttons/enter_level_buttons");
const {cancel_button} = require("../../../buttons/similar_buttons/cancel_button");

module.exports = new class SimilarService {
    async answer(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.voice) {
            const channels = await ChannelModel.find()
            if (channels.length !== 0) {
                const questioner = ctx.session.questioner;
                channels.forEach(channel => {
                    ctx.telegram.sendVoice(channel.channelChatId, ctx.message.voice.file_id, {
                        caption: voice_caption(questioner),
                        reply_markup : channel_post_buttons
                    })
                })
                ctx.reply("جواب شما ثبت شد و به تمام کانال ها ارسال شد", await auth_button(ctx));
                await ctx.telegram.sendMessage(questioner.userChatId, yourQuestionAnswered)
                await QuestionerModel.findOneAndDelete({userChatId: questioner.userChatId})
                ctx.session = undefined;
            } else {
                ctx.session.questioner = undefined;
                ctx.reply("بات عضو کانالی نیست.", await auth_button(ctx))
            }
        } else {
            ctx.session.questioner = undefined;
            ctx.reply(onlyVoiceMessage, await auth_button(ctx));
        }
    }

    async removeQuestion(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text === all_buttons_text.yes) {
            let questionerId = await QuestionerModel.findById(ctx.session.questionerId)
            if (questionerId) {
                await QuestionerModel.findByIdAndDelete(ctx.session.questionerId)
                ctx.session = undefined
                ctx.reply("سوال مورد نظر با موفقیت حذف شد", await auth_button(ctx))
            } else {
                ctx.session = undefined
                ctx.reply("این سوال قبلا حذف شده است.", await auth_button(ctx))
            }
        } else if (ctx.message.text === all_buttons_text.no) {
            ctx.session = undefined
            ctx.reply("درخواست شما لغو شد.", await auth_button(ctx))
        } else {
            ctx.session = undefined
            ctx.reply("ورودی نامعتبر میباشد.", await auth_button(ctx))
        }
    }

    async getFieldForSendContent(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.riyazi ||
                ctx.message.text === all_buttons_text.tajrobi ||
                ctx.message.text === all_buttons_text.ensani ||
                ctx.message.text === all_buttons_text.honar ||
                ctx.message.text === all_buttons_text.zaban ||
                ctx.message.text === all_buttons_text.other_fields
            ) {
                const contentField = await ctx.message.text
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    contentField,
                }
                ctx.session.state = stateList.getGradeForSendContent;
                ctx.reply(
                    "لطفا پایه ی تحصیلی را وارد کنید : ",
                    enter_grade_buttons
                );
            } else {
                ctx.session = undefined
                ctx.reply("ورودی نامعتبر است.", await auth_button(ctx))
            }
        }
    }

    async getGradeForSendContent(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.tenth ||
                ctx.message.text === all_buttons_text.eleventh ||
                ctx.message.text === all_buttons_text.twelfth
            ) {
                const contentGrade = await ctx.message.text
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    contentGrade,
                }
                ctx.session.state = stateList.getLevelForSendContent;
                ctx.reply(
                    "لطفا سطح دانش آموز را وارد کنید : ",
                    enter_level_buttons
                );
            } else {
                ctx.session = undefined
                ctx.reply("ورودی نامعتبر است.", await auth_button(ctx))
            }
        }
    }

    async getLevelForSendContent(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            if (ctx.message.text === all_buttons_text.level_A ||
                ctx.message.text === all_buttons_text.level_B ||
                ctx.message.text === all_buttons_text.level_C ||
                ctx.message.text === all_buttons_text.level_D
            ) {
                const contentLevel = await ctx.message.text
                ctx.session.stateData = {
                    ...ctx.session.stateData,
                    contentLevel,
                }
                ctx.session.state = stateList.sendContentForProStudents;
                ctx.reply(
                    "لطفا پیام خود را وارد نمایید : ",
                    cancel_button
                );
            } else {
                ctx.session = undefined
                ctx.reply("ورودی نامعتبر است.", await auth_button(ctx))
            }
        }
    }

    async sendContentForProStudents(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const students = await ProStudentModel.find({
                isPro: true,
                userField: ctx.session.stateData.contentField,
                userGrade: ctx.session.stateData.contentGrade,
                userLevel: ctx.session.stateData.contentGrade
            })
            if (students.length !== 0) {
                students.forEach(student => {
                    ctx.telegram.copyMessage(student.userChatId, ctx.chat.id, ctx.message.message_id)
                })
                ctx.session = undefined
                ctx.reply("محتوا با موفقیت برای دانش آموزان ویژه ارسال شد.", await auth_button(ctx))
            } else {
                ctx.session = undefined
                ctx.reply("دانش آموزانی با این ویژگی ها یافت نشد.", await auth_button(ctx))
            }
        }
    }

    async sendContentForAllStudents(ctx, next) {
        ctx.session.state = undefined;
        if (ctx.message.text !== all_buttons_text.cancel) {
            const users = await UserModel.find()
            if (users.length !== 0) {
                users.forEach(user => {
                    ctx.telegram.copyMessage(user.userChatId, ctx.chat.id, ctx.message.message_id)
                })
                ctx.session = undefined
                ctx.reply("محتوا با موفقیت برای همه ی  دانش آموزان ارسال شد.", await auth_button(ctx))
            } else {
                ctx.session = undefined
                ctx.reply("دانش آموزی یافت نشد.", await auth_button(ctx))
            }
        }
    }


}
