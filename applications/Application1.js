const mongoose = require("mongoose");
const {startBot} = require("./app1/index");
const winston = require("winston");

class Application {
    constructor() {
        this.setupMongo();
        this.setupLogger();
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

    setupLogger() {
        winston.add(new winston.transports.File({filename: "errors.log", level: 'error'}));
    }

}

module.exports = Application;
