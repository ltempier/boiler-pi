'use strict';
var moment = require('moment');
var config = require('./config');
var dataCollection = require('./mongodb').data;

module.exports = function (app) {
    app.route('/api/conso/:from/:to')
        .get(function (req, res) {
            var dateFrom = req.param('from');
            var dateTo = req.param('to');


        })
};

