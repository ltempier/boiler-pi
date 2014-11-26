var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);


var routes = [
    {
        title: 'Dashboard',
        url: '/',
        templateUrl: 'templates/graph.html',
        controller: 'graph'
    },
    {
        title: 'Planning',
        url: '/planning',
        templateUrl: 'templates/planning.html',
        controller: 'planning'
    },
    {
        title: 'Panel',
        url: '/panel',
        templateUrl: 'templates/panel.html',
        controller: 'panel'
    }
];

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        routes.forEach(function (route) {
            $routeProvider.when(route.url, {
                templateUrl: route.templateUrl,
                controller: route.controller});
        });

        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }
]);

app.controller('navbar', ['$scope', '$location', function ($scope, $location) {
    $scope.links = routes;
    $scope.isActive = function (link) {
        return link.url === $location.path();
    }
}]);