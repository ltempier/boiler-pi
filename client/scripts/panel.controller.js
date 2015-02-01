app.controller('panelCtrl', ['$scope','$http', function ($scope, $http) {

    $scope.steps = 0
    $scope.addSteps = function(){
        $http.post('/api/steps', {steps: $scope.steps})
            .success(function () {

            }).error(function (data) {
                console.log('post error', arguments)
            });
    }
}]);