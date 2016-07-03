angular
	.module('myApp')
	.controller('requestController', requestController);

function requestController($scope,$cookies, $http,$location,authService) {
  $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/elements',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'} ,
            xhrFields: {withCredentials: true }
        })
    	   .success(function(data) {
          	$scope.result=data;
	      	$scope.lan = [];

      		angular.forEach($scope.result.language, function(item) {
            	$scope.lan.push(item);
            })

      		$scope.con = [];

      		angular.forEach($scope.result.context, function(item) {
            	$scope.con.push(item);
            })

      		$scope.typ = [];
      		angular.forEach($scope.result.code_type, function(item) {
            	$scope.typ.push(item);
            })
         
        })

    $scope.Postquestion=function(){

    	var snap = {
            'user_id':1,
    		    'title': $scope.inputData.Title,
            'description': $scope.inputData.Description,
           	'context': $scope.inputData.Context.id,
            'tags': $scope.inputData.Tags,
            'language': $scope.inputData.Language.id,
            'code_type': $scope.inputData.Codetype.id,
            'user_id':$cookies.get("user_id")
        };
      //var object = authService.getCookieData;
        //var object = $cookies.get('auth');


        $http({
        	method: 'POST',
        	url: 'http://www.koodet.com:6543/api/questions',
        	data:JSON.stringify(snap),
          crossDomain: true, 
          xhrFields: { withCredentials: true},
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data, status, headers, config) {
        	console.log(data);
        	console.log(status);
          $location.path('/question/'+ data.question_id);

        })
   	}
}