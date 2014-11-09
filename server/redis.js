'use strict'

var redis = require('redis');

var raspberry = process.env.NODE_ENV === 'raspberry';

if (raspberry)
    var client = redis.createClient();
else
    var client = redis.createClient(6379, '192.168.0.21', {});

module.exports = client