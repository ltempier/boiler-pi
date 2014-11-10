'use strict';
var mongodb = require('./mongodb');
var moment = require('moment');
var config = require('./config');

module.exports = function (app) {
    app.route('/api/conso/:from/:to')
        .get(function (req, res) {
            var dateFrom = req.param('from');
            var dateTo = req.param('to');



        })
};

