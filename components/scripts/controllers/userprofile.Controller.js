angular
    .module('myApp')
    .controller('userprofileController', userprofileController);

profileController.$inject = ['$scope','$cookies','$routeParams','$http','$location'];

function userprofileController($scope,$cookies,$routeParams, $http, $location){

     var username = $routeParams.username;
      
      $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/users/'+username,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'} ,
            xhrFields: {withCredentials: true }
        })
    	   .success(function(data) {
    	   	console.log(data);
	      	$scope.username = data.username;
	      	$scope.firstname = data.firstname;
	      	$scope.lastname = data.lastname;
	      	$scope.email = data.email;
            $scope.country = data.country;
            $scope.snippets = data.snippets;
            $scope.questions = data.questions;
	      })

}



