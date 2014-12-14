'use strict';

var gpio = require('pi-gpio');
var records = require('./nedb').get('records', true);

var recorder = null;
var state = false;

var recordPin = 12;

module.exports = {
    start: start,
    stop: stop,
    getConso: getConso
};

function getConso(dateFrom, dateTo, callback) {
    dateTo = dateTo || Date.now();
    var query = {"date": {"$gte": dateFrom, "$lt": dateTo}};
    records.find(query, callback)
}

function start() {
    stop();
    gpio.open(recordPin, "input", function (err) {
        if (err) {
            console.log('erreur gpio open 12 ', err);
            return
        }
        recorder = setInterval(function () {
            gpio.read(12, function (err, value) {
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
        }, 200)
    });
}

function stop() {
    clearInterval(recorder);
    gpio.close(recordPin);
}