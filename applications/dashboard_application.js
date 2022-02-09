// require modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// require web application 
const web_application = require("./dashboard_app/index");

let web_config = {
    port: 3000,
    default_user : {
        username: 'admin',
        password: 'admin'
    }
}
module.exports = class dashboard_application {
    constructor(){
        this.config_server();
        this.configMongoose();
        this.total_config();
    }

    // server
    config_server(){
        app.listen(web_config.port, () => {
            console.log(`server started on port ${web_config.port}`);
        });
    }

    // mongodb
    configMongoose(){
        mongoose
        .connect("mongodb://127.0.0.1:27017/RadeGozineBot")
        .then(() => {
          console.log("web_application db connected");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // total_config
    async total_config(){
        await app.use('/', web_application);
    }
}