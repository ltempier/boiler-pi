'use strict';
var _ = require('underscore');
var records = require('./nedb').get('records');

module.exports = {
    routes: function (app) {
        app.get('/api/conso/:from/:to', function (req, res) {
            var dateFrom = parseInt(req.param('from'));
            var dateTo = parseInt(req.param('to')) || Date.now();
            var query = {"date": {"$gte": dateFrom, "$lt": dateTo}};
            records.find(query, function (err, replies) {
                if (err)
                    res.send(500);
                else
                    res.json(replies)
            })
        });
    }
}





