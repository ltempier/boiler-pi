app.factory('recorderService', ['$http', function ($http) {
    return{
        getData: function (startDate, endDate) {


            $http.get('/api/records', {params: {
                from: startDate.valueOf(),
                to: endDate.valueOf()
            }}).
                success(function (listData) {


                }).
                error(function (data, status, headers, config) {
                });
        },
        formatDataFromServer: function (listData, params) {
            var currentState = _.first(listData).state;
            _.each(listData, function (data) {


            })
        }
    }
}]);