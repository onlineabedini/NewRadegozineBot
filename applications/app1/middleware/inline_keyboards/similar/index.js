//import our classes
const SimilarService = require('./SimilarService')

module.exports = {
    ANSWER: SimilarService.answer,
    DELETE: SimilarService.delete,
    YES: SimilarService.yes,
    NO: SimilarService.no,
    CANCEL: SimilarService.cancel,
}