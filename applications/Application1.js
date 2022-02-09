const mongoose = require("mongoose");
const { startBot } = require("./app1/index");

module.exports = class Application {
  constructor() {
    this.setupMongo();
    startBot();
  }
  setupMongo() {
    mongoose
      .connect("mongodb://127.0.0.1:27017/RadeGozineBot")
      .then(() => {
        console.log("db connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

