angular
	.module('myApp')
	.controller('addSnippetController', addSnippetController);


function addSnippetController($scope, $http) {

	$scope.init = init;
	$scope.fetchOptions = fetchOptions;

	function init() {
		$scope.title = "r";
		$scope.description = "";
		$scope.code = "";	
		$scope.languages = [];
		$scope.contexts = [];
		$scope.types = [];
		$scope.tags = [];
	}

	function fetchOptions() {
		console.log($scope.title);
		return option.getOptions().then(function(data){
			$scope.languages = data.language;
			$scope.contexts = data.context;
			$scope.types = data.code_type;
			console.log("salam");

		})
	}

	// $http
	// 	.get("http://41.35.68.11:6543/api/elements")
 //    	.success(function(data) {
 //     		$scope.result=data;
 //         	console.log(data);
	// 		console.log(status);
	// 		$scope.lan = [];
	// 		angular.forEach($scope.result.language, function(item) {
 //             $scope.lan.push(item);
 //            })
	// 		$scope.con = [];
	// 		angular.forEach($scope.result.context, function(item) {
 //             $scope.con.push(item);
 //            })
	// 		$scope.typ = [];
	// 		angular.forEach($scope.result.code_type, function(item) {
 //            $scope.typ.push(item);
 //            })
         
 //    })
}