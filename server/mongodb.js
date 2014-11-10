'use strict';

var _ = require('underscore');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

var database = null;
var collections = ['data'];

module.exports.init = function (callback) {
    MongoClient.connect(config.mongodb, function (err, db) {
        if (err) {
            console.log('mongodb erreur connection ', err);
            callback(err);
        }
        else {
            db.collectionNames({namesOnly:true}, function(err, existCollections){
                console.log('mongodb connection ', config.mongodb);
                existCollections = _.map(existCollections, function (existCollection) {
                    return existCollection.split('.').pop()
                });
                var newCollections = _.difference(collections, existCollections);
                database = db;
                async.eachSeries(newCollections, function (collection, next) {
                    console.log('mongodb new collection ', collection);
                    db.createCollection(collection, {}, next)
                }, callback)

            })
        }
    });
};

module.exports.db = database;