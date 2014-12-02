var Datastore = require('nedb');
var path = require('path');
var _ = require('underscore');

var dbDirectory = path.join(__dirname, '..', 'data');
var collections = ['records', 'schemas', 'plannings'];

var db = {};

_.each(collections, function (collection) {
    db[collection] = new Datastore({ filename: path.join(dbDirectory, collection), autoload: true });
});

module.exports.get = function (collection, create) {
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