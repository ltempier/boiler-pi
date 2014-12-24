var path = require('path');
var _ = require('underscore');
var config = require('./config').server;
var session = require('cookie-session');

module.exports = function (app) {
    app.use(session({
        httpOnly: true,
        secret: config.secret
    }));

    app.post('/login', function (req, res) {
        var user = _.findWhere(config.users, {username: req.body.username,
            password: req.body.password});
        if (user) {
            req.session.connect = true;
            res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
        } else {
            res.sendFile(path.join(__dirname, '..', 'client', 'login.html'))
        }
    });

    app.use(function (req, res, next) {
        if (req.session && req.session.connect == true)
            next();
        else
            res.sendFile(path.join(__dirname, '..', 'client', 'login.html'))
    });
};