app.controller('planningCtrl', ['$scope', '$modal', function ($scope, $modal) {
    $scope.weekDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'];

    $scope.schemas = {
        list: [
            {
                title: 'default',
                id: ''
            },
            {
                title: 'custom 0',
                id: ''
            },
            {
                title: 'custom 1',
                id: ''
            }
        ],
        show: function () {
            var modalInstance = $modal.open({
                templateUrl: 'schema.html',
                controller: 'schemaCtrl',
                resolve: {
                    data: function () {
                        return [1, 2, 3]
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {

            });
        }
    };

    $scope.plannings = {
        list: [
            {
                title: 'weekdays',
                date: {
                    type: 'select',
                    from: 'Monday',
                    to: 'Friday'
                },
                schema: '',
                required: true
            },
            {
                title: 'weekend',
                date: {
                    type: 'select',
                    from: 'Saturday',
                    to: 'Sunday'
                },
                schema: '',
                required: true
            }
        ],
        add: function () {
            this.list.push({
                title: 'custom date ' + (this.list.length - 1),
                date: {
                    type: 'date',
                    from: '',
                    to: ''
                },
                schema: '',
                edit: true
            })
        },
        save: function () {
            _.each(this.list, function (planning) {
                delete planning.edit
            })
        },
        remove: function (index) {
            if (!this.list[index].required) {
                this.list.splice(index, 1);
            }
        }
    }
}]);

app.controller('schemaCtrl', ['$scope', '$modalInstance', 'data', function ($scope, $modalInstance, data) {
    console.log(data)
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);


