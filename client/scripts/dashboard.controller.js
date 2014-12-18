app.controller('dashboardCtrl', ['$scope', function ($scope) {


    $.getJSON('http://www.highcharts.com/samples/data/from-sql.php?callback=?', function (data) {

        angular.element('#records-graph').highcharts('StockChart', {
            chart: {
                zoomType: 'x'
            },

            rangeSelector: {

                buttons: [{
                    type: 'hour',
                    count: 1,
                    text: '1h'
                }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false, // it supports only days
                selected: 4
            },

            xAxis : {
                events : {
                    afterSetExtremes : afterSetExtremes
                },
                minRange: 3600 * 1000 // one hour
            },

            yAxis: {
                floor: 0,
                title: {
                    text: 'Temperature (°C)'
                }
            },

            title: {
                text: ''
            },

            series : [{
                name: 'Records',

                data : data,
                dataGrouping: {
                    enabled: false
                }
            }],

            navigator : {
                adaptToUpdatedData: false,
                series : {
                    data : data
                }
            },

            scrollbar: {
                liveRedraw: false
            }
        });
    })


    function afterSetExtremes(e) {

        var chart = angular.element('#records-graph').highcharts();

        chart.showLoading('Loading data from server...');
        $.getJSON('http://www.highcharts.com/samples/data/from-sql.php?start=' + Math.round(e.min) +
            '&end=' + Math.round(e.max) + '&callback=?', function (data) {

            chart.series[0].setData(data);
            chart.hideLoading();
        });
    }

}]);