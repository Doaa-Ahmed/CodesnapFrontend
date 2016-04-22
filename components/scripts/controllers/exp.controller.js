angular
	.module('myApp')
	.controller('expController', expController);

function expController($scope, $http, $routeParams) {

	var snap = {
        'language':$routeParams.lanid
    };

    $http({
        method: 'POST',
        url: 'http://www.koodet.com:6543/api/explore/snippets',
        data:JSON.stringify(snap),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
        $scope.result=data;

        $scope.tit = [];
        angular.forEach($scope.result, function(item) {
         	$scope.tit.push(item);
            console.log(item.title);
        })
    })
}