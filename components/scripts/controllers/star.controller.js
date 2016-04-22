angular
	.module('myApp')
	.controller('starCtrl', starCtrl);

function starCtrl($scope, $http) {
	$scope.rating = 0;
    $scope.rateFunction = function(rating) {
    	var obj = {rating: rating};
 
        $http({
        	method: 'POST',
        	url: 'http://www.koodet.com:6543/api',
        	data:JSON.stringify(obj),
        	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      	})
      	.success(function(data, status, headers, config) {
          console.log(data);
          console.log(status);
        })
      	.error(function(data, status, headers, config) {
        	console.log(data);
        	console.log(status);
      	})
    };
}