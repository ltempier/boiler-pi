var _ = require('underscore');
var async = require('async');
var Datastore = require('nedb');
var path = require('path');

var dbDirectory = path.join(__dirname, '..', 'data');
var collections = ['records', 'schemas', 'plannings', 'steppers'];

var db = {};

module.exports = {
    init: init,
    get: get
};

function init(callback) {
    async.each(collections, function (collection, next) {
        db[collection] = new Datastore({ filename: path.join(dbDirectory, collection)});
        db[collection].loadDatabase(next)
    }, callback)
}

function get(collection, create) {
    if (_.contains(collections, collection))
        return db[collection];
    else if (create) {
        collections.push(collection);
        db[collection] = new Datastore({ filename: path.join(dbDirectory, collection), autoload: true });
        return db[collection];
    } else {
        console.log('nedb error');
        return null
    }
};