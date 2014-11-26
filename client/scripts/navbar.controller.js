app.controller('navbar', ['$scope', '$location', function ($scope, $location) {

    $scope.links = [
        {
            title: 'Home',
            route: '/'
        },
        {
            title: 'Panel',
            route: '/panel'
        }
    ];
    $scope.isActive = function (link) {
        return link.route === $location.path();
    }
}]);