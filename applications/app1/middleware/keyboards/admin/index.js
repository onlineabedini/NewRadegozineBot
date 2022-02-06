const AdminService = require('./AdminService')
const {manageAdminsButtonsText} = require("../../../buttons/adminButtons/manageAdminsButtons");
const {manageAdvisersButtonsText} = require("../../../buttons/adminButtons/manageAdvisersButtons");
const {adminStartButtonsText} = require("../../../buttons/adminButtons/adminStartButtons");


module.exports = {
    [manageAdminsButtonsText.addAdmin]: AdminService.addAdmin,
    [manageAdminsButtonsText.removeAdmin]: AdminService.removeAdmin,
    [manageAdminsButtonsText.getAdminsList]: AdminService.getAdminsList,
    [manageAdvisersButtonsText.addAdviser]: AdminService.addAdviser,
    [manageAdvisersButtonsText.removeAdviser]: AdminService.removeAdviser,
    [manageAdvisersButtonsText.getAdvisersList]: AdminService.getAdvisersList,
    [adminStartButtonsText.manageAdmins]: AdminService.manageAdmins,
    [adminStartButtonsText.manageAdvisers]: AdminService.manageAdvisers,
    [adminStartButtonsText.sendMessageForAdvisers]: AdminService.sendMessageForAdvisers,
    [adminStartButtonsText.sendMessageForStudents]: AdminService.sendMessageForStudents,
    [adminStartButtonsText.getStudentsQuestionsListForAdmins]: AdminService.getStudentsQuestionsListForAdmins,
    [adminStartButtonsText.getAdvisersQuestionsList]: AdminService.getAdvisersQuestionsList,
    [manageAdminsButtonsText.addAdminCancel]: AdminService.addAdminCancel,
    [manageAdminsButtonsText.removeAdminCancel]:  AdminService.removeAdminCancel,
    [manageAdvisersButtonsText.addAdviserCancel]: AdminService.addAdviserCancel,
    [manageAdvisersButtonsText.removeAdviserCancel]: AdminService.removeAdviserCancel,
}