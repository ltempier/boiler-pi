'use strict';

var _ = require('underscore');
var async = require('async');
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config').server;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function noCache(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (req.url.indexOf('/api/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
    }
    next();
});

app.use(morgan(':method :url :response-time'));

require('./server/login')(app);

app.use(express.static((path.join(__dirname, 'client'))));

async.series([
    function (cb) {
        require('./server/nedb').init(cb)
    }
], function (err) {
    if (err)
        console.log('ERROR init server ', err);
    else {
        require('./server/api')(app);

        app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, 'client', 'index.html'))
        });

        app.listen(config.port, config.ip, function (err) {
            if (err)
                console.log('ERROR express server ', err);
            else
                console.log('Start express server on port ' + config.port)
        });
    }
});



