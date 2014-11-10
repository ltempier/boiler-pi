'use strict';
var moment = require('moment');
var config = require('./config');
var dataCollection = require('./mongodb').collection('data');

module.exports = function (app) {
    app.route('/api/conso/:from/:to')
        .get(function (req, res) {
            var dateFrom = new Date(parseInt(req.param('from')));
            var dateTo = new Date(parseInt(req.param('to')) || Date.now());
            var q = {"date": {"$gte": dateFrom, "$lt": dateTo}};
            console.log(q);
            dataCollection.find({ $query: q, $orderby: { date : -1 } })
                .limit(1000)
                .toArray(function (err, replies) {
                    console.log(arguments)
                    if (err)
                        res.send(500);
                    else
                        res.json(replies)
                })
        })
};

