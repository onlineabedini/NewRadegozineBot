//import our classes
const SimilarService = require("./SimilarService");

module.exports = {
    PLAN: SimilarService.selectPlan,
    ANSWER: SimilarService.answer,
    DELETE: SimilarService.delete,
};
