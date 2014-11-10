'use strict';

var gpio = require('pi-gpio');
var mongodb = require('./mongodb');
var config = require('./config');
var dataCollection = mongodb.db.collection('data');

var recorder = null;
var state = null;

module.exports = function () {
    gpio.close(12);
    gpio.open(12, "input", function (err) {
        if (err) {
            console.log('erreur gpio open 12 ', err);
            return
        }
        recorder = setInterval(function () {
            gpio.read(12, function (err, value) {
                if (err) throw err;
                value = Boolean(value);
                if (state == null || state != value) {
                    state = value;
                    dataCollection.insert({date: Date.now(), state: value}, function (err) {
                        if (err)
                            console.log('recorder error ' + err);
                        else
                            console.log('add new state ' + value)
                    })
                }
            });
        }, 200)
    });
};

function stop() {
    clearInterval(recorder);
    gpio.close(12);
}