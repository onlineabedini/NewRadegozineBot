const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("ContentModel", schema);
