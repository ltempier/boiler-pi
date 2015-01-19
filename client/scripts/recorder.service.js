app.factory('recorderService', ['$http', '$q', function ($http, $q) {

    var valueOn = 1;
    var valueOff = 0;

    function formatDataFromServer(listData, params) {
        var formatListData = [];
        var currentState;
        var filterListData = _.filter(listData, function (data) {
            if (params && params.startDate && params.endDate) {
                return data.date >= params.startDate && data.date <= params.endDate
            } else
                return true

        });
        filterListData = _.sortBy(filterListData, function (data) {
            return data.date
        });
        _.each(filterListData, function (data) {
            if (data.state != currentState) {
                currentState = data.state;
                formatListData.push({
                    x: data.date - 10,
                    y: !currentState ? valueOn : valueOff
                });
                formatListData.push({
                    x: data.date + 10,
                    y: currentState ? valueOn : valueOff
                })
            }
        });

        return formatListData
    }

    return{
        getData: function (startDate, endDate) {
            var deferred = $q.defer();
            $http.get('/api/records', {params: {
                from: startDate.valueOf(),
                to: endDate.valueOf()
            }}).
                success(function (listData) {
                    deferred.resolve(listData)
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(arguments)
                });

            return deferred.promise;
        },
        getConsumptionTime: function (formatListData) {
            var deltaValue = 0;
            var lastDate = _.first(formatListData).x;
            var lastValue = _.first(formatListData).y;
            _.each(formatListData, function (data) {
                if (data.y == valueOn && lastValue == valueOn) {
                    deltaValue += (data.x - lastDate)
                }
                lastValue = data.y;
                lastDate = data.x
            });

            return {
                consumptionTime: deltaValue,
                time: _.last(formatListData).x - _.first(formatListData).x
            }
        },
        concatDataByDay: function (formatListData) {
            var mCurrentDate = moment(_.first(formatListData).x)



        },
        formatDataFromServer: formatDataFromServer
    }
}]);
