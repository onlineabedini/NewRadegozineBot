// import AdminService Class
const AdminService = require("../admin/AdminService");

//import stateList
const stateList = require("../../stateList");

module.exports = {
  [stateList.addAdmin]: AdminService.addAdmin,
  [stateList.removeAdmin]: AdminService.removeAdmin,
  [stateList.getAdminFullName]: AdminService.getAdminFullName,

  [stateList.addAdviser]: AdminService.addAdviser,
  [stateList.removeAdviser]: AdminService.removeAdviser,
  [stateList.promoteAdviser]: AdminService.promoteAdviser,
  [stateList.demoteAdviser]: AdminService.demoteAdviser,
  [stateList.getAdviserFullName]: AdminService.getAdviserFullName,
  [stateList.acceptAdviser]: AdminService.acceptAdviser,
  [stateList.rejectAdviser]: AdminService.rejectAdviser,
  [stateList.removeStudent]: AdminService.removeStudent,
  [stateList.acceptStudent]: AdminService.acceptStudent,
  [stateList.rejectStudent]: AdminService.rejectStudent,
  [stateList.removePlan]: AdminService.removePlan,

  [stateList.getProStudentFullNameFromAdmin]: AdminService.getProStudentFullNameFromAdmin,
  [stateList.getProStudentUserNameFromAdmin]: AdminService.getProStudentUserNameFromAdmin,
  [stateList.getProStudentFieldFromAdmin]: AdminService.getProStudentFieldFromAdmin,
  [stateList.getProStudentGradeFromAdmin]: AdminService.getProStudentGradeFromAdmin,
  [stateList.getProStudentLevelFromAdmin]: AdminService.getProStudentLevelFromAdmin,
  [stateList.getProStudentPhoneNumberFromAdmin]: AdminService.getProStudentPhoneNumberFromAdmin,
  [stateList.getProStudentWhatsUpNumberFromAdmin]: AdminService.getProStudentWhatsUpNumberFromAdmin,
  [stateList.getProStudentEmailFromAdmin]: AdminService.getProStudentEmailFromAdmin,
  [stateList.getProStudentCityFromAdmin]: AdminService.getProStudentCityFromAdmin,
  [stateList.registerProStudentByAdmin]: AdminService.registerProStudentByAdmin,

  [stateList.getPlanTitle]: AdminService.getPlanTitle,
  [stateList.getPlanPrice]: AdminService.getPlanPrice,
  [stateList.getPlanDescription]: AdminService.getPlanDescription,
  [stateList.getPlanImage]: AdminService.getPlanImage,
  [stateList.registerPlan]: AdminService.registerPlan,

  [stateList.sendMessageForAdvisers]: AdminService.sendMessageForAdvisers,
  [stateList.sendMessageForAllUsers]: AdminService.sendMessageForAllUsers,
  [stateList.sendMessageForRegStudents]: AdminService.sendMessageForRegStudents,

};
