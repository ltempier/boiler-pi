'use strict'

var express = require('express');
var path = require('path');
var app = express();

var raspberry = process.env.NODE_ENV === 'raspberry';

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'client', 'views'));
app.use(express.static(__dirname));

app.use('/scripts', express.static(path.join(__dirname, 'client', 'scripts')))
app.use('/styles', express.static(path.join(__dirname, 'client', 'styles')))

app.use(function noCache(req, res, next) {
    if (!raspberry || req.url.indexOf('/api/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
    }
    next();
});

if (raspberry)
    require('./server/recorder')();
require('./server/api')(app);
require('./server/route')(app);

app.listen(8000, '0.0.0.0', function () {
    console.log('Start express server')
})