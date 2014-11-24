'use strict';

var wpi = require('wiring-pi');
var servoPin = 4 // pin 16;


wpi.setup();
wpi.pinMode(servoPin, wpi.modes.PWM_OUTPUT);
wpi.pwmSetClock(20);
module.exports.setOrder = function (order) {
    order = Math.floor(order*1023/100)
    wpi.pwmWrite(servoPin, order);
};


function stop(){
    wpi.pinMode(servoPin, wpi.modes.INPUT);
}