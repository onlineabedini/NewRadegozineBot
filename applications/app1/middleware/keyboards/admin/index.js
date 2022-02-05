const AdminService = require('./AdminService')
const {mainButtonsText} = require("../../../buttons/ButtonManager");

module.exports = {
    [mainButtonsText.addAdmin]: AdminService.addAdmin,
    [mainButtonsText.removeAdmin]: AdminService.removeAdmin,
    [mainButtonsText.getAdminsList]: AdminService.getAdminsList,
    [mainButtonsText.addAdviser]: AdminService.addAdviser,
    [mainButtonsText.removeAdviser]: AdminService.removeAdviser,
    [mainButtonsText.getAdvisersList]: AdminService.getAdvisersList,
    [mainButtonsText.manageAdmins]: AdminService.manageAdmins,
    [mainButtonsText.manageAdvisers]: AdminService.manageAdvisers,
    [mainButtonsText.sendMessageForAdvisers]: AdminService.sendMessageForAdvisers,
    [mainButtonsText.sendMessageForStudents]: AdminService.sendMessageForStudents,
    [mainButtonsText.getStudentsQuestionsListForAdmins]: AdminService.getStudentsQuestionsListForAdmins,
    [mainButtonsText.getAdvisersQuestionsList]: AdminService.getAdvisersQuestionsList,
    [mainButtonsText.addAdminCancel]: AdminService.addAdminCancel,
    [mainButtonsText.removeAdminCancel]:  AdminService.removeAdminCancel,
    [mainButtonsText.addAdviserCancel]: AdminService.addAdviserCancel,
    [mainButtonsText.removeAdviserCancel]: AdminService.removeAdviserCancel,
    [mainButtonsText.back]: AdminService.back,
}