app.controller('schemaCtrl', ['$scope', '$http', 'action', 'schema', function ($scope, $http, action, schema) {

    $scope.schema = schema.data;

    $scope.chartConfig = {
        options: {
            chart: {
                renderTo: 'graph',
                animation: false,
                type: 'areaspline'
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
            }
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

        tooltip: {
            valueDecimals: 0
        },
        series: [
            {
                showInLegend: false,
//                draggableX: true,
                draggableY: true,
                data: $scope.schema.data
            }
        ],
        title: {
            text: ''
        },
        loading: false
    };

    $scope.save = function () {
        $scope.schema.data = _.map($scope.schema.data, function (data) {
            return {x: Math.round(data.x),
                y: Math.round(data.y)}
        });
        action.data = {schema: $scope.schema};
        $http(action).success(function (newSchema) {
            console.log('old ', $scope.schema.data[0]);
            console.log('ok ', newSchema.data[0]);
            $scope.schema = newSchema
        }).error(function (data, status) {
            console.log(arguments)
        });
    }
}]);
