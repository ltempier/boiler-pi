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
        moment().startOf('month').valueOf(),
        moment().endOf('month').valueOf(),
        function () {
            console.log('addRandomRecords finish ', arguments)
        });

    function addRandomRecords(startDate, endDate, callback) {
        var state = true;
        var recordDate = startDate;
        var count = 0;
        async.whilst(
            function () {
                return recordDate < endDate
            },
            function (next) {
                records.insert(
                    {date: recordDate, state: state}
                    , function (err) {
                        if (err)
                            next(err);
                        else {
                            count++;
                            recordDate += _.random(10 * 1000, 3600 * 60);
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
