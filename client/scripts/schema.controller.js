app.controller('schemaCtrl', ['$scope', '$http', '$timeout', 'action', 'schema', function ($scope, $http, $timeout, action, schema) {

    $scope.schema = schema.data;


    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'graph',
            animation: false,
            type: 'areaspline',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
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
                name: 'order',
                color: '#F39C12',
                showInLegend: false,
//                draggableX: true,
                draggableY: true,
                data: $scope.schema.data
            }
        ],
        title: {
            text: ''
        },
        loading: false,
        plotOptions: {
            series: {
                cursor: 'ns-resize',
                point: {
                    events: {
                        drag: function (e) {
                            this.y = Math.round(e.newY);
                            if (e.newY < 0) {
                                this.y = 0;
                                return false;
                            }
                            if (e.newY > 100) {
                                this.y = 100;
                                return false;
                            }
                        },
                        drop: function (e) {
                            $scope.schema.data[e.currentTarget.x].y = Math.round(e.currentTarget.y);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal'
            }
        }
    });


    $scope.alert = {
        show: false,
        display: function (message, event, json) {
            $scope.alert.message = message;
            $scope.alert.json = json;
            if (event == 'success') {
                $scope.alert.icon = 'fa fa-check-circle';
                $scope.alert.class = 'alert alert-success';
            }
            else if (event == 'error') {
                $scope.alert.icon = 'fa fa-times-circle';
                $scope.alert.class = 'alert alert-danger';
            }
            $scope.alert.show = true;
            $timeout(function () {
                $scope.alert.show = false
            }, 2000)
        }
    };

    $scope.save = function () {
        $scope.schema.data = _.map($scope.schema.data, function (data) {
            return {x: Math.round(data.x),
                y: Math.round(data.y)}
        });
        action.data = {schema: $scope.schema};
        $http(action).success(function (newSchema) {
            $scope.schema = newSchema;
            $scope.alert.display('Save Successful.', 'success')
        }).error(function (data) {
            $scope.alert.display(data, 'error', data.err)
        });
    }
}]);
