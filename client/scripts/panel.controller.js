app.controller('panelCtrl', ['$scope', function ($scope, $http) {

    $scope.steps = 0
    $scope.addSteps = function(){
        var url = '/api/stepper';
        $http.post(url, {steps: $scope.steps})
            .success(function () {

            }).error(function (data) {
                console.log('post error', arguments)
            });
    }
}]);