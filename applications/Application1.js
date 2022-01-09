const mongoose = require("mongoose");
const { startBot } = require("./app1/index");

class Application {
  constructor() {
    this.configApp();
    this.setupMongo();
    startBot();
  }
  setupMongo() {
    mongoose
      .connect("mongodb://127.0.0.1:27017/RadeGozineBot")
      .then(() => {
        // mongoose.connect('mongodb://localhost:27017/RadeGozineBot').then(() => {
        console.log("db connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  configApp() {
    require("dotenv").config();
  }
}

module.exports = Application;
