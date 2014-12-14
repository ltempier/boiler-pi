var _ = require('underscore');
var async = require('async');
var plannings = require('./nedb').get('plannings');

var defaultPlannings = [
    {
        title: 'week',
        date: {
            weekday: true,
            from: 1,
            to: 5
        },
        schema: ''
    },
    {
        title: 'week-end',
        date: {
            weekday: true,
            from: 6,
            to: 7
        },
        schema: ''
    }
];

function init(callback) {
    plannings.findOne({}, function (err, plannings) {
        if (err)
            callback(err);
        else {
            if (plannings)
                callback();
            else
                setAllPlannings(defaultPlannings, callback)
        }
    })
}

plannings.find({}, function (err, allPlannings) {
    if (err) {
        console.log(err)
    } else if (allPlannings.length == 0) {
        plannings.insert(defaultPlannings, function (err) {
            console.log(err)
        });
    }
});

module.exports = {
    getAllPlannings: getAllPlannings,
    setAllPlannings: setAllPlannings
};

function setAllPlannings(allPlannings, callback) {
    _.each(allPlannings, function (planning, index) {
        planning.index = index
    });

    async.series([
        function (cb) {
            plannings.remove({}, { multi: true }, cb);
        },
        function (cb) {
            plannings.insert(allPlannings, cb);
        }
    ], callback)
}

function getAllPlannings(callback) {
    plannings.find({}).sort({ index: 1 }).exec(callback);
}