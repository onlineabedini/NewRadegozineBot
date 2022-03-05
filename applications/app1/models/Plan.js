const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: String,
    },
    image: {
        type : "mixed"
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model("PlanModel", schema);
