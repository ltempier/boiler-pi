'use strict';
var redis = require('./redis');
var moment = require('moment');
var config = require('./config');

module.exports = function (app) {
    app.route('/api/conso/:from/:to')
        .get(function (req, res) {
            var dateFrom = req.param('from');
            var dateTo = req.param('to');

            dateFrom = moment(parseInt(dateFrom)).format(config.dateFormat);
            dateTo = moment(parseInt(dateTo)).format(config.dateFormat);


            redis.keys('2014/11/09 11*', function (err, keys) {
                redis.mget(keys,function(err, replies){
                    console.log(keys)
                    console.log(replies)
                    });
                })
        })
};

