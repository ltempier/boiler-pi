var gpio = require('pi-gpio');
var async = require('async');
var _ = require('underscore');

var pins = _.values({
//    red: 37,
    orange: 35,
    yellow: 33,
    pink: 31,
    blue: 29
})

async.each(pins, function (pin, next) {
    gpio.close(pin);
    gpio.open(pin, "output", next)
}, function (err) {
    if (err)
        console.log('stepper error ', err)
    else {
        setInterval(step, 1000)
    }
});


function step(callback) {
    var steps = [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
        [1, 0, 0, 1]
    ];
    async.eachSeries(steps, function (step, next) {
        var commands = [];
        _.each(step, function (value, index) {
            commands.push(function (cb) {
                gpio.write(pins[index], value, cb)
            })
        })
        async.parallel(commands, next)
    }, callback)
}