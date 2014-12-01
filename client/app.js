var app = angular.module('app', ['ngRoute', 'ngResource', 'highcharts-ng']);

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
        url: '/schema',
        templateUrl: '/templates/schema.html',
        controller: 'schemaCtrl',
        resolve: {
            action: function () {
                return {
                    method: 'POST',
                    url: '/api/schemas'
                }
            },
            schema: function () {
                var defaultData = _.map(_.range(0, 25), function (index) {
                    return {x: index, y: 50}
                });
                return {data: {data: defaultData}}
            }
        },
        navbar: false
    },
    {
        title: 'Schema',
        url: '/schema/:id',
        templateUrl: '/templates/schema.html',
        controller: 'schemaCtrl',
        resolve: {
            action: function ($route) {
                var id = $route.current.params.id;
                return {
                    method: 'PUT',
                    url: '/api/schemas/' + id
                }
            },
            schema: function ($http, $route) {
                var id = $route.current.params.id;
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