// import AdminService Class
const AdminService = require("../admin/AdminService");

//import stateList
const stateList = require('../../stateList')

module.exports = {
    [stateList.addAdmin]: AdminService.addAdmin,
    [stateList.removeAdmin]: AdminService.removeAdmin,
    [stateList.getAdminFullName]: AdminService.getAdminFullName,
    [stateList.addAdviser]: AdminService.addAdviser,
    [stateList.removeAdviser]: AdminService.removeAdviser,
    [stateList.getAdviserFullName]: AdminService.getAdviserFullName,
    [stateList.sendMessageForAdvisers]: AdminService.sendMessageForAdvisers,
    [stateList.sendMessageForStudents]: AdminService.sendMessageForStudents,
};
