app.controller('dashboardCtrl', ['$scope', 'recorderService', 'dailyConsumption', function ($scope, recorderService, dailyConsumption) {

    angular.element('#daily-chart').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            minRange: 1000
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false
                }
            }
        },
        series: [
            {
                name: 'records',
                color: '#e74c3c',
                type: 'area',
                data: dailyConsumption}
        ]
    })


    console.log(recorderService.getPercentageConsumption(dailyConsumption))

}]);