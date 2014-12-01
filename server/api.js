'use strict';
var _ = require('underscore');
var moment = require('moment');
var records = require('./nedb').get('records');
var schemas = require('./nedb').get('schemas');

module.exports = function (app) {
    app.get('/api/conso/:from/:to', function (req, res) {
        var dateFrom = parseInt(req.param('from'));
        var dateTo = parseInt(req.param('to')) || Date.now();
        var query = {"date": {"$gte": dateFrom, "$lt": dateTo}};
        records.find(query, function (err, replies) {
            if (err)
                res.send(500);
            else
                res.json(replies)
        })
    });

    app.get('/api/schemas/:id', function (req, res) {
        schemas.findOne({ _id: req.param('id') }, function (err, schema) {
            if (err)
                res.status(500).json({err: err, message: 'db error'});
            else {
                res.status(200).json(schema)
            }
        });
    });
    app.get('/api/schemas', function (req, res) {
        schemas.find({}, function (err, allSchemas) {
            if (err)
                res.status(500).json({err: err, message: 'db error'});
            else {
                res.status(200).json(allSchemas)
            }
        });
    });
    app.post('/api/schemas', function (req, res) {
        var schema = req.param('schema');
        if (schema) {
            schema.data = _.map(schema.data, function (data) {
                return {x: Math.round(data.x),
                    y: Math.round(data.y)}
            })
            schemas.insert(schema, function (err, newSchema) {
                if (err)
                    res.status(500).json({err: err, message: 'db error'});
                else {
                    res.status(200).json(newSchema)
                }
            });
        }
        else
            res.status(500).json({message: 'schema data missing'})
    })
};

