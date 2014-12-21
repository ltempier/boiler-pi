app.controller('dashboardCtrl', ['$scope', 'recorderService', function ($scope, recorderService) {


    recorderService.getData(moment().startOf('day'), moment().endOf('day'))



}]);