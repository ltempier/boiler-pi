var _ = require('underscore');
var schemas = require('./nedb').get('schemas');

module.exports = function (app) {
    app.get('/api/schemas/:id', function (req, res) {
        schemas.findOne({ _id: req.param('id') }, function (err, schema) {
            if (err)
                res.status(500).json({err: err, message: 'db error'});
            else {
                res.status(200).json(schema)
            }
        });
    });
    app.put('/api/schemas/:id', function (req, res) {
        var schema = req.body.schema;
        if (schema) {
            schemas.update({ _id: req.param('id') }, schema, function (err) {
                if (err)
                    res.status(500).json({err: err, message: 'db error'});
                else {
                    res.status(200).json(schema)
                }
            });
        }
        else
            res.status(500).json({message: 'schema data missing'})
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
        var schema = req.body.schema;
        if (schema) {
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