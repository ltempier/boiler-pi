var _ = require('underscore');
var schemas = require('./nedb').get('schemas');

module.exports = {
    createSchema: createSchema,
    getSchema: getSchema,
    updateSchema: updateSchema,
    removeSchema: removeSchema,
    getAllSchemas: getAllSchemas
};

function createSchema(schema, callback) {
    if (schema)
        schemas.insert(schema, callback);
    else
        callback(new Error('schema data missing'))
}

function getSchema(id, callback) {
    schemas.findOne({ _id: id }, callback);
}

function getAllSchemas(callback) {
    schemas.find({}, callback);
}

function updateSchema(id, schema, callback) {
    if (schema) {
        schemas.update({ _id: id }, schema, function (err) {
            if (err)
                callback(err);
            else {
                callback(null, schema)
            }
        });
    }
    else
        callback(new Error('schema data missing'))
}

function removeSchema(id, callback) {
    schemas.remove({ _id: id }, {}, callback);
}