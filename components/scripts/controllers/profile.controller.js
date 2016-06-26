angular
    .module('myApp')
    .controller('profileController', profileController);

profileController.$inject = ['$scope','$cookies','$http','$location'];

function profileController($scope,$cookies, $http, $location){

     var user_id = $cookies.get("user_id");
      
      $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/users/'+user_id,
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



