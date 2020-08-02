const path = require('path')
const router = require('express').Router();

module.exports = (app) => {
    app.route('/')
        .get((req, res) => {
            res.sendFile(path.join(__dirname, '../../../dist/client/index.html'));
        })
    
}