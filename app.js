'use strict';

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var raspberry = process.env.NODE_ENV === 'raspberry';

app.use(express.static((path.join(__dirname, 'client'))));

app.use(function noCache(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (!raspberry || req.url.indexOf('/api/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
    }
    next();
});

app.use(function (req, res, next) {
    console.log(req.url)
    next()
})

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./server/nedb');
require('./server/api')(app);

if (raspberry) {
    require('./server/recorder').start();
    require('./server/stepper')
}



app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

app.listen(8000, '0.0.0.0', function (err) {
    if (err)
        console.log('ERROR express server ', err);
    else
        console.log('Start express server')
});

