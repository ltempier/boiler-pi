var _ = require('underscore');
var plannings = require('./nedb').get('plannings');

module.exports = function (app) {
    app.get('/api/schemas', function (req, res) {
        plannings.find({}, function (err, allPlannings) {
            if (err)
                res.status(500).json({err: err, message: 'db error'});
            else {
                res.status(200).json(allPlannings)
            }
        });
    });
    app.post('/api/schemas', function (req, res) {
        var planning = req.body.planning;
        if (planning) {
            plannings.insert(planning, function (err, newPlanning) {
                if (err)
                    res.status(500).json({err: err, message: 'db error'});
                else {
                    res.status(200).json(newPlanning)
                }
            });
        }
        else
            res.status(500).json({message: 'newPlanning data missing'})
    })
}