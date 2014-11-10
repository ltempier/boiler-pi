'use strict';
var gpio = require('pi-gpio');
var redis = require('./redis');
var moment = require('moment');
var config = require('./config');

var recorder = null;
var state = null;

module.exports = function () {
    gpio.close(12);
    gpio.open(12, "input", function (err) {

        if (err) {
            console.log('erreur gpio open 12 ', err)
            return
        }

        recorder = setInterval(function () {
            gpio.read(12, function (err, value) {
                if (err) throw err;
                value = Boolean(value)
                if (state == null || state != value) {
                    console.log(Date.now() + ' new state ' + value)
                    state = value;
                    redis.set(moment().utc().format(config.dateFormat), value);
                }
            });
        }, 200)
    });
};

function stop() {
    clearInterval(recorder);
    gpio.close(12);
}