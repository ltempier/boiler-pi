'use strict'

var redis = require('redis');
var config = require('./config')

var raspberry = process.env.NODE_ENV === 'raspberry';

if (raspberry)
    var client = redis.createClient();
else
    var client = redis.createClient(config.redis.port, config.redis.ip, config.redis.options);

module.exports = client