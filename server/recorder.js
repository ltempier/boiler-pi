'use strict'
var gpio = require('pi-gpio');
var redis = require('./redis');
var moment = require('moment');

var recorder = null;
var state = null;

module.exports = function(){
    gpio.close(12);
    gpio.open(12, "input", function(err) {

        if(err){
            console.log('erreur gpio open 12 ',err)
            return
        }

        recorder = setInterval(function(){
            gpio.read(12, function(err, value) {
                if(err) throw err;
                value = Boolean(value)
                if(state == null || state != value){
                    console.log('new state ', value)
                    state = value;
                    redis.set(moment().utc().format('DD/MM/YYYY hh:mm:ss'), value);
                }
            });
        }, 200)
    });
}

function stop(){
    clearInterval(recorder)
    gpio.close(12);
}