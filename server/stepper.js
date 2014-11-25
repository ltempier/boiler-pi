var gpio = require('pi-gpio');
var async = require('async');
var _ = require('underscore');

var pins = _.values({
    blue: 29,
    pink: 31,
    yellow: 33,
    orange: 35
//    red: 37
})

async.each(pins, function (pin, next) {
    gpio.close(pin);
    gpio.open(pin, "output", next)
}, function (err) {
    if (err)
        console.log('stepper error ', err)
    else {
        setInterval(function () {
            step(true)
        }, 0)
    }
});

function step(direction, callback) {
    if (typeof direction === 'function')
        callback = direction
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
    if (!direction)
        steps.reverse();
    async.eachSeries(steps, function (step, next) {
        var commands = [];
        _.each(step, function (value, index) {
            commands.push(function (cb) {
                gpio.write(pins[index], value, cb)
            })
        });
        async.parallel(commands, next)
    }, callback)
}