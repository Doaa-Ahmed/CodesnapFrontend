angular
	.module('myApp')
	.controller('listLangsController', listLangsController);

function listLangsController($scope, $http, $routeParams,authService) {
    $scope.languages = [];
	$scope.fetchLangs = fetchLangs;

    function fetchLangs() {
        
    }
}