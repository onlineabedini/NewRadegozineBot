// require modules
const AdminService = require("../admin/AdminService");
const stateList = require('../../stateList')

module.exports = {
  [stateList.ADDADMIN]: AdminService.addAdmin,
  [stateList.REMOVEADMIN]: AdminService.removeAdmin,
  [stateList.GETADMINFULLNAME]: AdminService.getAdminFullName,
  [stateList.ADDADVISER]:AdminService.addAdviser,
  [stateList.REMOVEADVISER]: AdminService.removeAdviser,
  [stateList.GETADVISERFULLNAME]: AdminService.getAdviserFullName,
  [stateList.SENDMESSAGEFORADVISERS]:AdminService.sendMessageForAdvisers,
  [stateList.SENDMESSAGEFORSTUDENTS]: AdminService.sendMessageForStudents,
};
