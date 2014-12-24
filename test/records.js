var _ = require('underscore');
var moment = require('moment');

require('../server/nedb').init(function (err) {
    if (err) {
        console.log('nedb.init() error');
        return
    }

    require('../server/recorder').addRandomRecords(
        moment().startOf('day').subtract(1, 'day').valueOf(),
        moment().endOf('day').subtract(1, 'day').valueOf(),
        function () {
            console.log('addRandomRecords finish ', arguments)
        });
});
