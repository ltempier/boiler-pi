'use strict';
var moment = require('moment');
var record = require('./nedb').get('record');

module.exports = function (app) {
    app.route('/api/conso/:from/:to')
        .get(function (req, res) {
            var dateFrom = new Date(parseInt(req.param('from')));
            var dateTo = new Date(parseInt(req.param('to')) || Date.now());
            var query = {"date": {"$gte": dateFrom, "$lt": dateTo}};
            console.log(query);
            record.find(query, function (err, replies) {
                console.log(arguments)
                if (err)
                    res.send(500);
                else
                    res.json(replies)
            })
        })
};

