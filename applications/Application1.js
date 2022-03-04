const mongoose = require("mongoose");
const { start_bot } = require("./app1/index");
const winston = require("winston");

module.exports = new (class Application {
  constructor() {
    this.setup_mongo();
    this.setup_logger();
    start_bot();
  }

  setup_mongo() {
    mongoose
      .connect("mongodb://127.0.0.1:27017/RadeGozineBot")
      .then(() => {
        console.log("db connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setup_logger() {
    winston.add(
      new winston.transports.File({ filename: "errors.log", level: "error" })
    );
  }
})();
