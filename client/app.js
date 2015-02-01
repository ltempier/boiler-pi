var app = angular.module('app', ['ngRoute', 'ngResource']);

var routes = [
    {
        title: 'Dashboard',
        url: '/',
        templateUrl: '/templates/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: {
            currentWeekConsumption: function (recorderService) {
                return recorderService.getData(
                    moment().subtract(1, 'week'),
                    moment())
            }
        }
    },
    {
        title: 'Planning',
        url: '/planning',
        templateUrl: '/templates/planning.html',
        controller: 'planningCtrl',
        resolve: {
            allSchemas: function ($http, $q) {
                var deferred = $q.defer();
                $http.get('/api/schemas')
                    .success(function (listData) {
                        deferred.resolve(listData)
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(arguments)
                    });

                return deferred.promise;
            },
            allPlannings: function ($http, $q) {
                var deferred = $q.defer();
                $http.get('/api/plannings')
                    .success(function (listData) {
                        deferred.resolve(listData)
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject(arguments)
                    });
                return deferred.promise;
            }
        }
    },
    {
        title: 'Panel',
        url: '/panel',
        templateUrl: '/templates/panel.html',
        controller: 'panelCtrl',
        resolve: {

        }
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

app.controller('navbar', ['$scope', '$location', '$http', function ($scope, $location, $http) {
    $scope.links = _.reject(routes, function (route) {
        return route.navbar == false
    });
    $scope.isActive = function (link) {
        return link.url === $location.path();
    }
}]);

app.run(['$rootScope', function ($rootScope) {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    $rootScope.accessors = {
        getId: function (element) {
            return element._id
        }
    };
}]);