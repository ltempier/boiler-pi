app.controller('schemaCtrl', ['$scope', 'schema', function ($scope, schema) {


    console.log(schema)

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'graph',
            animation: false,
            type: 'areaspline'
        },
        title: {
            text: ''
        },
        xAxis: {
            title: {
                text: 'hours'
            },
            min: 0,
            max: 24,
            tickInterval: 1
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '%'
            }
        },
        plotOptions: {
            series: {
                cursor: 'ns-resize',
                point: {
                    events: {
                        drag: function (e) {
                            // Returning false stops the drag and drops. Example:
                            if (e.newY < 0) {
                                this.y = 0;
                                return false;
                            }
                            if (e.newY > 100) {
                                this.y = 100;
                                return false;
                            }

                            $('#drag').html(
                                    'Dragging <b>' + this.series.name + '</b>, <b>' + this.category + '</b> to <b>' + Highcharts.numberFormat(e.newY, 2) + '</b>');
                        },
                        drop: function () {
                            $('#drop').html(
                                    'In <b>' + this.series.name + '</b>, <b>' + this.category + '</b> was set to <b>' + Highcharts.numberFormat(this.y, 2) + '</b>');
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal'
            }
        },
        tooltip: {
            valueDecimals: 0
        },
        series: [
            {
                showInLegend: false,
//                draggableX: true,
                draggableY: true,
                data: schema.data
            }
        ]

    });

}]);