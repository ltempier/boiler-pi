var gpio = require('pi-gpio');
var async = require('async');
var _ = require('underscore');
var steppers = require('./nedb').get('steppers');

var pins = _.values({
    blue: 29,
    pink: 31,
    yellow: 33,
    orange: 35
//    red: 37
});

var defaultConfig = {
    minStep: 0,
    maxStep: 300,
    position: 0
};

var currentConfig;

module.exports = {
    init: init,
    setOrder: setOrder
};

function init(callback) {
    async.series([
        function (cb) {
            steppers.findOne({}, function (err, config) {
                if (err)
                    cb(err);
                else {
                    if (config) {
                        currentConfig = config;
                        cb()
                    } else {
                        steppers.insert(defaultConfig, function (err, newConfig) {
                            if (err)
                                cb(err);
                            else {
                                currentConfig = newConfig;
                                cb()
                            }
                        })
                    }
                }
            })
        },
        function (cb) {
            async.each(pins, function (pin, next) {
                gpio.close(pin);
                gpio.open(pin, "output", next)
            }, cb);
        }], callback)
}


function setOrder(order, callback) {

    console.log('setOrder: ' + order);

    var orderSteps = order * currentConfig.maxStep / 100;
    var steps = currentConfig.position - orderSteps;

    var direction = true;
    if (steps < 0)
        direction = false;
    steps = Math.abs(steps);
    async.whilst(function () {
        return steps > 0;
    }, function (cb) {
        steps--;
        step(direction, cb)
    }, callback);
}

function step(direction, callback) {
    if (typeof direction === 'function') {
        callback = direction;
        direction = true;
    }
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
    var newPosition = currentConfig.position;

    if (!direction) {
        newPosition--;
        steps.reverse();
    } else
        newPosition++;

    if (newPosition >= currentConfig.minStep && newPosition <= currentConfig.maxStep)
        async.series([
            function (cb) {
                async.eachSeries(steps, function (step, next) {
                    var commands = [];
                    _.each(step, function (value, index) {
                        commands.push(function (cb) {
                            gpio.write(pins[index], value, cb)
                        })
                    });
                    async.parallel(commands, next)
                }, cb)
            },
            function (cb) {
                steppers.update(currentConfig, { $set: { position: newPosition } }, {}, function (err) {
                    if (err)
                        cb(err);
                    else {
                        currentConfig.position = newPosition;
                        cb()
                    }
                })
            }
        ], callback);
    else
        callback(new Error("new position not allowed"))
}