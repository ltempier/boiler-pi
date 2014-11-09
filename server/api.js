'use strict'
var redis = require('./redis');
var moment = require('moment');

module.exports = function(app){
    app.route('/api/data/:from/:to/:step')
        .get(function(req,res){




        })
}

