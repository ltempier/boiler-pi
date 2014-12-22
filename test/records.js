var _ = require('underscore');
var async = require('async');
var moment = require('moment');

require('../server/nedb').init(function (err) {
    if (err) {
        console.log('nedb.init() error');
        return
    }

    var records = require('../server/nedb').get('records', true);
    addRandomRecords(
        moment().startOf('day').valueOf(),
        moment().endOf('day').valueOf(),
        function () {
            console.log('addRandomRecords finish ', arguments)
        });


    function addRandomRecords(startDate, endDate, callback) {
        var state = true;
        var recordDate = startDate;
        var count = 0;

        var dates = [];

        while (recordDate < endDate) {
            dates.push(recordDate);
            recordDate += _.random(10 * 1000, 60 * 60 * 1000);
        }

        async.eachSeries(dates, function (date, next) {
            records.insert(
                {date: date, state: state}
                , function (err) {
                    if (err)
                        next(err);
                    else {
                        count++;
                        state = !state;
                        next()
                    }
                });

        }, function (err) {
            if (err)
                callback(err);
            else
                callback(null, count)
        })
    }
});
