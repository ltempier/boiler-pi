var app = angular.module('app', ['ngRoute', 'ngResource']);

var routes = [
    {
        title: 'Dashboard',
        url: '/',
        templateUrl: '/templates/graph.html',
        controller: 'graphCtrl'
    },
    {
        title: 'Planning',
        url: '/planning',
        templateUrl: '/templates/planning.html',
        controller: 'planningCtrl',
        resolve: {
            allSchemas: function ($http) {
                return $http.get('/api/schemas')
            }
        }
    },
    {
        title: 'Panel',
        url: '/panel',
        templateUrl: '/templates/panel.html',
        controller: 'panelCtrl'
    },
    {
        title: 'Schema',
        url: '/schema/:id',
        templateUrl: '/templates/schema.html',
        controller: 'schemaCtrl',
        resolve: {
            schema: function ($http, $route) {
                var id = $route.current.params.id;
                var testData = _.map(_.range(0, 25), function (index) {
                    return {x: index, y: 50}
                });
                return $http.get('/api/schemas/' + id)
            }
        },
        navbar: false
    }
];

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        routes.forEach(function (route) {
            $routeProvider.when(route.url, {
                templateUrl: route.templateUrl,
                controller: route.controller,
                resolve: route.resolve
            });
        });

        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }
]);

app.controller('navbar', ['$scope', '$location', function ($scope, $location) {
    $scope.links = _.reject(routes, function (route) {
        return route.navbar == false
    });
    $scope.isActive = function (link) {
        return link.url === $location.path();
    }
}]);