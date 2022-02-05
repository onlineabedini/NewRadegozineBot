const AdminService = require('./AdminService')

module.exports = {
    ANSWER: AdminService.answer,
    DELETE:  AdminService.delete,
    YES:AdminService.yes,
    NO: AdminService.no,
    CANCEL: AdminService.cancel,
}