const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  contentTitle: {
    type: String,
  },
  contentDescription: {
    type: String,
  },
});

module.exports = mongoose.model("ContentModel", schema);
