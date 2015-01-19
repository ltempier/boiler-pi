app.controller('dashboardCtrl', ['$scope', 'recorderService', 'currentWeekConsumption', function ($scope, recorderService, currentWeekConsumption) {


    displayChart('#daily-chart', moment().startOf('day'), moment().endOf('day'));
    displayChart('#week-chart', moment().startOf('week'), moment().endOf('week'));

    function displayChart(chartId, startDate, endDate) {
        var data = recorderService.formatDataFromServer(currentWeekConsumption, {startDate: startDate, endDate: endDate})
        angular.element(chartId).highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: ''
            },
            yAxis: {
                labels: {
                    formatter: function () {
                        if (this.value == 0)
                            return 'off'
                        else if (this.value == 1)
                            return 'on';
                    }
                },
                tickInterval: 1,
                title: {
                    text: null
                },
                min: 0,
                max: 1
            },
            xAxis: [
                {
                    type: 'datetime',
                    min: startDate.valueOf(),
                    max: endDate.valueOf()
                }
            ],
            tooltip: {
                formatter: function () {
                    return '<b>' + Highcharts.dateFormat('%H:%M:%S', this.x) + ' : ' + (this.y == 1 ? 'on' : 'off') + '</b>';
                }
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                radius: 3
                            }
                        }
                    },
                    turboThreshold: data.length
                }
            },
            series: [
                {
                    name: 'today',
                    color: '#e74c3c',
                    type: 'area',
                    data: data
                }
            ]
        })
    }
}]);