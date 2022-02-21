const ProStudentService = require("../../../middleware/sessions/pro_student/ProStudentService");

const stateList = require("../../stateList");

module.exports = {
  [stateList.getProStudentFullName]: ProStudentService.getProStudentFullName,
  [stateList.getProStudentField]: ProStudentService.getProStudentField,
  [stateList.getProStudentGrade]: ProStudentService.getProStudentGrade,
  [stateList.getProStudentPhoneNumber]: ProStudentService.getProStudentPhoneNumber,
  [stateList.getProStudentWhatsUpNumber]: ProStudentService.getProStudentWhatsUpNumber,
  [stateList.getProStudentEmail]: ProStudentService.getProStudentEmail,
  [stateList.getProStudentCity]: ProStudentService.getProStudentCity,
  [stateList.getProStudentPaymentPicture]: ProStudentService.getProStudentPaymentPicture,
  [stateList.registerProStudent]: ProStudentService.registerProStudent,
};
