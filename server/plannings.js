var _ = require('underscore');
var async = require('async');
var plannings = require('./nedb').get('plannings');

plannings.find({}, function (err, allPlannings) {
    if (err) {
        console.log(err)
    } else if (allPlannings.length == 0) {
        var defaultPlannings = [
            {
                title: 'weekdays',
                date: {
                    options: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday'],
                    from: 'Monday',
                    to: 'Friday'
                },
                schema: '',
                required: true
            },
            {
                title: 'weekend',
                date: {
                    options: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday'],
                    from: 'Saturday',
                    to: 'Sunday'
                },
                schema: '',
                required: true
            }
        ];
        plannings.insert(defaultPlannings, function (err) {
            console.log(err)
        });
    }
});

module.exports = function (app) {
    app.get('/api/plannings', function (req, res) {
        plannings.find({}, function (err, allPlannings) {
            if (err)
                res.status(500).json({err: err, message: 'db error'});
            else {
                res.status(200).json(allPlannings)
            }
        });
    });
    app.post('/api/plannings', function (req, res) {
        async.eachSeries(req.body.plannings, function (planning, next) {
            if (planning._id) {
                if (planning.remove)
                    plannings.remove({ _id: planning._id }, {}, next);
                else
                    plannings.update({ _id: planning._id}, planning, {multi: true}, next);
            } else
                plannings.insert(planning, next);
        }, function (err) {
            if (err)
                res.status(500).json({err: err, message: 'db error'});
            else {
                res.status(200)
            }
        })
    })
};