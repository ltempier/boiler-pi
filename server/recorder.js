'use strict';

var _ = require('underscore');
var async = require('async');
var records = require('./nedb').get('records', true);
var config = require('../config');

var recorder = null;
var state = false;

var recordPin = config.recordPin;

if (process.env.NODE_ENV === 'raspberry')
    module.exports = {
        start: start,
        stop: stop,
        getConso: getConso,
        addRandomRecords: addRandomRecords
    };
else
    module.exports = {
        getConso: getConso,
        addRandomRecords: addRandomRecords
    };

function getConso(dateFrom, dateTo, callback) {
    dateTo = dateTo || Date.now();
    var query = {"date": {"$gte": dateFrom, "$lt": dateTo}};
    records.find(query, callback)
}

function start() {
    var gpio = require('pi-gpio');
    stop(gpio);
    gpio.open(recordPin, "input", function (err) {
        if (err) {
            console.log('erreur gpio open ' + recordPin, err);
            return
        }
        recorder = setInterval(function () {
            gpio.read(recordPin, function (err, value) {
                if (err) throw err;
                value = Boolean(value);
                if (state != value) {
                    records.insert(
                        {date: Date.now(), state: value}
                        , function (err) {
                            if (err)
                                console.log('recording error ', err);
                            else
                                state = value;
                        });
                }
            });
        }, config.recordTimeInterval)
    });
}

function stop(gpio) {
    clearInterval(recorder);
    try {
        gpio.close(recordPin);
    }
    catch (err) {
        console.log(err)
    }
}

function addRandomRecords(startDate, endDate, callback) {
    var state = true;
    var recordDate = startDate;
    var count = 0;

    var dates = [];

    while (recordDate < endDate) {
        dates.push(recordDate);
        recordDate += _.random(10 * 1000, 60 * 60 * 1000);
    }

    async.eachSeries(dates, function (date, next) {
        records.insert(
            {date: date, state: state}
            , function (err) {
                if (err)
                    next(err);
                else {
                    count++;
                    state = !state;
                    next()
                }
            });

    }, function (err) {
        if (err)
            callback(err);
        else
            callback(null, count)
    })
}