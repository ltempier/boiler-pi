var app = angular.module('app', ['ngRoute', 'ngResource']);

var routes = [
    {
        title: 'Dashboard',
        url: '/',
        templateUrl: '/templates/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: {
            dailyConsumption: function (recorderService) {
                return recorderService.getData(
                    moment().subtract(1, 'day'),
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
            allSchemas: function ($http) {
                return $http.get('/api/schemas')
            },
            allPlannings: function ($http) {
                return $http.get('/api/plannings')
            }
        }
    },
//    {
//        title: 'Panel',
//        url: '/panel',
//        templateUrl: '/templates/panel.html',
//        controller: 'panelCtrl'
//    }
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

app.run(function ($rootScope) {

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    $rootScope.accessors = {
        getId: function (element) {
            return element._id
        }
    }
});