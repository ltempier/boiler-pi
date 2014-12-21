app.factory('recorderService', ['$http', '$q', function ($http, $q) {


    function formatDataFromServer(listData, params) {
        var currentState = _.first(listData).state;
        _.each(listData, function (data) {


        })
    }

    return{
        getData: function (startDate, endDate) {
            $q(function (resolve, reject) {
                $http.get('/api/records', {params: {
                    from: startDate.valueOf(),
                    to: endDate.valueOf()
                }}).
                    success(function (listData) {
                        resolve(formatDataFromServer(listData, {
                            startDate: startDate,
                            endDate: endDate
                        }))
                    }).
                    error(function (data, status, headers, config) {
                        reject(arguments)
                    });
            })

        },
        formatDataFromServer: formatDataFromServer
    }
}]);
