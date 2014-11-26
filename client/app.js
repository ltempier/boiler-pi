var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'templates/graph.html',
            controller: 'graph'});

        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }
]);
