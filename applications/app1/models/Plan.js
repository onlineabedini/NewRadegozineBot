const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  planTitle: {
    type: String,
  },
  planPrice: {
    type: String,
  },
  planImage: {
    type: String,
  },
  planDescription: {
    type: String,
  },
});

module.exports = mongoose.model("PlanModel", schema);
