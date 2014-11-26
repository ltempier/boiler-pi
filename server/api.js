'use strict';
var moment = require('moment');
var record = require('./nedb').get('record');

module.exports = function (app) {
    app.get('/api/conso/:from/:to', function (req, res) {
        var dateFrom = parseInt(req.param('from'));
        var dateTo = parseInt(req.param('to')) || Date.now();
        var query = {"date": {"$gte": dateFrom, "$lt": dateTo}};
        console.log(query);
        record.find(query, function (err, replies) {
            if (err)
                res.send(500);
            else
                res.json(replies)
        })
    })
};

