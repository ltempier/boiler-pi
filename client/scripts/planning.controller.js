app.controller('planning', ['$scope', function ($scope) {
    $scope.weekDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'];
    $scope.schemas = _.range(5);
    $scope.plannings = [
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
    ];
    $scope.add = function () {
        $scope.plannings.push({
            title: 'custom date ' + ($scope.plannings.length - 1),
            date: {
                type: 'date',
                from: '',
                to: ''
            },
            schema: '',
            edit: true
        })
    };
    $scope.save = function () {
        _.each($scope.plannings, function (planning) {
            delete planning.edit
        })
    };
    $scope.remove = function (index) {
        if (!$scope.plannings[index].required) {
            $scope.plannings.splice(index, 1);
        }
    }
}]);