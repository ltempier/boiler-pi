'use strict';
var _ = require('underscore');

var recorder = require('./recorder');
var plannings = require('./plannings');
var schemas = require('./schemas');

module.exports = function (app) {

    app.get('/api/mode', function (req, res) {

    });

    app.get('/api/records', function (req, res) {
        recorder.getConso(parseInt(req.param('from')), parseInt(req.param('to')),
            function (err, replies) {
                if (err)
                    res.status(500).json({err: err});
                else
                    res.json(replies)
            })
    });
    app.get('/api/schemas/:id', function (req, res) {
        schemas.getSchema(
            req.param('id'),
            function (err, schema) {
                if (err)
                    res.status(500).json({err: err});
                else {
                    res.status(200).json(schema)
                }
            });
    });
    app.post('/api/schemas/:id', function (req, res) {
        var schema = req.body.schema;
        schemas.updateSchema(
            req.param('id'),
            schema,
            function (err) {
                if (err)
                    res.status(500).json({err: err});
                else {
                    res.status(200).json(schema)
                }
            });
    });
    app.delete('/api/schemas/:id', function (req, res) {
        schemas.removeSchema(req.param('id'), function (err) {
            if (err)
                res.status(500).json({err: err});
            else {
                res.status(200)
            }
        });
    });
    app.post('/api/schemas', function (req, res) {
        schemas.createSchema(req.body.schema, function (err, newSchema) {
            if (err)
                res.status(500).json({err: err});
            else {
                res.status(200).json(newSchema)
            }
        });
    });
    app.get('/api/schemas', function (req, res) {
        schemas.getAllSchemas(function (err, allSchemas) {
            if (err)
                res.status(500).json({err: err});
            else {
                res.status(200).json(allSchemas)
            }
        });
    });
    app.get('/api/plannings', function (req, res) {
        plannings.getAllPlannings(function (err, allPlannings) {
            if (err)
                res.status(500).json({err: err});
            else {
                res.status(200).json(allPlannings)
            }
        });
    });
    app.post('/api/plannings', function (req, res) {
        plannings.setAllPlannings(req.body.plannings, function (err) {
            if (err)
                res.status(500).json({err: err});
            else {
                res.status(200)
            }
        })
    });
    if (process.env.NODE_ENV !== 'raspberry') {
        var stepper = require('./server/stepper');
        app.post('/api/steps', function (req, res) {
            stepper.addSteps(req.body.steps, function (err) {
                if (err)
                    res.status(500).json({err: err});
                else {
                    res.status(200)
                }
            })
        });
    }
};





