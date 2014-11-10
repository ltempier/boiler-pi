'use strict';

var _ = require('underscore');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

var database = null;
var collections = ['data'];

module.exports.init = function (callback) {
    MongoClient.connect(config.mongodb, {}, function (err, db) {
        if (err) {
            console.log('mongodb erreur connection ', err);
            callback(err);
        }
        else {
            db.collectionNames({namesOnly: true}, function (err, existCollections) {
                if (err)
                    callback(err);
                else {
                    console.log('mongodb connection ', config.mongodb);
                    database = db;
                    existCollections = _.map(existCollections, function (existCollection) {
                        return existCollection.split('.').pop()
                    });
                    async.eachSeries(collections, function (collection, next) {
                        var commands = [];
                        if (!_.contains(existCollections, collection)) {
                            commands.push(function (cb) {
                                console.log('mongodb new collection ', collection);
                                db.createCollection(collection, {}, cb)
                            })
                        }
                        commands.push(function (cb) {
                            database[collection] = db.collection(collection)
                            cb()
                        });
                        async.series(commands, next)
                    }, callback)
                }
            })
        }
    });
};

module.exports.db = database;