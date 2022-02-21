// require modules
const express = require("express");
module.exports = router = express.Router();

new class web_application {
    constructor() {
        this.render_routes();
    }

    render_routes() {
        // login
        router.get('/', (req, res) => {
            return res.send('login page');
        })

        // admin-panel
        router.get('/admin-panel', (req, res) => {
            return res.send('admin panel');
        })

        // not_found
        router.use('/', (req, res) => {
            res.send('not_found');
        })
    }
}
