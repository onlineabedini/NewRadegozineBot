const AdminService = require("./AdminService");

module.exports = {
    UPDATE_STUDENT :AdminService.updateStudent,
    REMOVE_STUDENT : AdminService.removeStudent,
    UPDATE_PLAN : AdminService.updatePlan,
    REMOVE_PLAN: AdminService.removePlan,
    ACC_ADVISER :AdminService.acceptAdviser,
    REJ_ADVISER : AdminService.rejectAdviser,
    ACC: AdminService.acceptStudent,
    REJ: AdminService.rejectStudent,
    SENDMSG: AdminService.sendMessage,
};