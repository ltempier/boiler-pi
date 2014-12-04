app.controller('planningCtrl', ['$scope', '$location', '$http', 'allSchemas', 'allPlannings', function ($scope, $location, $http, allSchemas, allPlannings) {
    $scope.schemas = {
        list: allSchemas.data,
        new: function () {
            var defaultSchema = {
                title: 'new schema',
                data: _.map(_.range(0, 25), function (index) {
                    return {x: index, y: 50}
                })
            };
            this.list.push(defaultSchema);
            this.select = defaultSchema
        },
        save: function () {
            if (this.select) {
                var url = '/api/schemas';
                if (this.select._id)
                    url = '/api/schemas/' + this.select._id;
                $http.post(url, {schema: this.select})
                    .success(function (newSchema) {
                        this.select = newSchema;
                    }).error(function (data) {
                        console.log('post error', arguments)
                    });
            }
        },
        delete: function () {
            if (this.select && this.select._id) {
                var url = '/api/schemas/' + this.select._id;
                $http.delete(url)
            }
            this.list.splice(_.indexOf(this.list, this.select), 1);
            this.select = _.first(this.list);
        }
    };

    $scope.$watch('schemas.select', function (selectSchema) {
        if (selectSchema) {
            new Highcharts.Chart(getChartConfig(selectSchema.data))
        }
    });

    $scope.schemas.select = _.first($scope.schemas.list);

    $scope.plannings = {
        list: (allPlannings.data),
        add: function () {
            this.list.push({
                title: 'custom date ' + (this.list.length - 1),
                date: {
                    type: 'date',
                    from: '',
                    to: ''
                },
                schema: ''
            })
        },
        save: function () {
            var url = '/api/plannings';
            $http.post(url, {plannings: this.list})
                .success(function (newSchema) {

                }).error(function (data) {
                    console.log('post error', arguments)
                });
        },
        remove: function (index) {
            if (!this.list[index].required) {
                this.list[index].remove = true
            }
        }
    };

    function getChartConfig(data) {
        return {
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
                    draggableY: true,
                    data: data
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
                                data[e.currentTarget.x].y = Math.round(e.currentTarget.y);
                            }
                        }
                    },
                    stickyTracking: false
                },
                column: {
                    stacking: 'normal'
                }
            }
        }
    }

}]);
