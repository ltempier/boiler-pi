var _ = require('underscore');
var async = require('async');
var moment = require('moment');
var cronJob = require('cron').CronJob;

var plannings = require('./plannings');
var schemas = require('./schemas');
var stepper = require('./stepper')


module.exports.start = function () {
    new CronJob('00 * * * * *', function () {

        console.log('new job')

        job(function (err) {
            if (err)
                console.log(err)
        })
    }, null, true, "America/Los_Angeles");
}

function job(callback) {
    var now = moment();
    plannings.getAllPlannings(function (err, plannings) {
        plannings = plannings.reverse();
        var currentSchemaId;
        _.each(plannings, function (planning) {
            if (planning.date && planning.date.options) {
                var startDate = planning.date.options.indexOf(planning.date.from);
                var endDate = planning.date.options.indexOf(planning.date.to);
                var range = planning.date.options.splice(startDate, endDate);

//                console.log(now.format('dddd'))
//                console.log(range)

                if (_.contains(range, now.format('dddd'))) {
                    currentSchemaId = planning.schema;
                    return
                }

            } else {
                var startDate = moment(planning.date.from);
                var endDate = moment(planning.date.to);

//                console.log(now.format())
//                console.log(startDate.format())
//                console.log(endDate.format())

                if (now.isAfter(startDate) && now.isBefore(endDate)) {
                    currentSchemaId = planning.schema;
                    return
                }
            }
        });

        if (currentSchemaId) {
//            schemas.getSchema(currentSchemaId, function (err, schema) {
//                var order = schema.data[now.hour()].y;
//                stepper.setOrder(order, callback)
//            })
        }
    })
}