'use strict';

var _ = require('underscore');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

var database = null;
var collections = ['data'];

module.exports.init = function (callback) {
    MongoClient.connect(config.mongodb, function (err, db) {
        console.log('mongodb connection ', config.mongodb)
        if (err)
            callback(err);
        else {
            database = db;
            async.eachSeries(collections, function (collection, next) {
                db.createCollection(collection, {}, next)
            }, callback)
        }
    });
};

module.exports.db = database;