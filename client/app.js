var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'ngResource']);


var routes = [
    {
        title: 'Dashboard',
        url: '/',
        templateUrl: 'templates/graph.html',
        controller: 'graphCtrl'
    },
    {
        title: 'Planning',
        url: '/planning',
        templateUrl: 'templates/planning.html',
        controller: 'planningCtrl'
    },
    {
        title: 'Panel',
        url: '/panel',
        templateUrl: 'templates/panel.html',
        controller: 'panelCtrl'
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