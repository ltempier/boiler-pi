var _ = require('underscore');
var async = require('async');
var moment = require('moment');
var cronJob = require('cron').CronJob;
var config = require('../config');

var plannings = require('./plannings');
var schemas = require('./schemas');
var stepper = require('./stepper');

module.exports.start = function () {
    new cronJob(config.cronJobParam, function () {
        job(function (err) {
            if (err)
                console.log(err)
        })
    }, null, true, "America/Los_Angeles");
};

function job(callback) {
    var now = moment();
    plannings.getAllPlannings(function (err, plannings) {
        plannings = plannings.reverse();
        var currentSchemaId;
        _.each(plannings, function (planning) {
            if (planning.date && planning.date.weekday) {
                if (now.isoWeekday() >= planning.date.from && now.isoWeekday() <= planning.date.to) {
                    currentSchemaId = planning.schema;
                    return
                }
            } else {
                var startDate = moment(planning.date.from);
                var endDate = moment(planning.date.to);
                if (now.isAfter(startDate) && now.isBefore(endDate)) {
                    currentSchemaId = planning.schema;
                    return
                }
            }
        });

        if (currentSchemaId) {
            schemas.getSchema(currentSchemaId, function (err, schema) {
                var order = schema.data[now.hour()].y;
                stepper.setOrder(order, callback)
            })
        }
    })
}