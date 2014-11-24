'use strict';

var gpio = require('pi-gpio');

var servoPin = 16;

var servo = null;

module.exports.setOrder = function (order) {
    stop();
    gpio.open(servoPin, "output", function (err) {
        if (err) {
            console.log('erreur gpio open ' + servoPin + ' ', err);
            return
        }
        servo = setInterval(function () {
            gpio.write(16, 1, function () {
                setTimeout(function () {
                    gpio.write(16, 0, function () {

                    })
                }, order)
            })
        }, 20)
    })
};

function stop() {
    clearInterval(servo);
    gpio.close(servoPin);
}