app.controller('PostController', ['$scope', '$http', function($scope, $http) {

this.postForm = function() {
var obj = {'username': $scope.inputData.username,'password': $scope.inputData.password};
	console.log(JSON.stringify(obj));

	$http({

		method: 'POST',
		url: 'http://172.17.42.1:6543/login',
		data:JSON.stringify(obj),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.success(function(data, status, headers, config) {
		//	window.location.href = 'pages/home.html';
			console.log(data);
			console.log(status);
				})
	.error(function(data, status, headers, config) {
	//	$scope.errorMsg = 'Unable to submit form';
		console.log(data);
		console.log(status);


	})
}

}]);

app.controller('signupController', ['$scope', '$http', function($scope, $http) {

this.signupForm = function() {
var upobject = {'first_name':$scope.signupData.firstname,
'last_name': $scope.signupData.lastname,
'username': $scope.signupData.username,
'email': $scope.signupData.email,
'password': $scope.signupData.password,
'avatar': $scope.signupData.avatar,
'country': $scope.signupData.country
			 };
						console.log(JSON.stringify(upobject));


	$http({
		method: 'POST',
		url: 'http://172.17.42.1:6543/signup',
		data:JSON.stringify(upobject),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.success(function(data, status, headers, config) {
			//window.location.href = 'index.html';
			console.log(data);
			console.log(status);
				})
	.error(function(data, status, headers, config) {
		//$scope.errorMsg = 'Unable to signup the form';
		console.log(data);
		console.log(status);


	})
}

}]);

app.controller('addController', ['$scope', '$http', function($scope, $http) {
	$http.get("http://172.17.42.1:6543/elements")
		 .success(function(data) {
			$scope.result=data;
			//$scope.languages = result['language']['name'];
			//$scope.contexts = result['context']['name'];
			//$scope.types =result['code_type']['name'];
			console.log(data);
	console.log(status);
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
		}]);


app.controller('snippetController', ['$scope', '$http', function($scope, $http) {

		$scope.Postsnippet=function(){
		var snap = {'title': $scope.inputData.Title,
								'description': $scope.inputData.Description,
								'code': $scope.inputData.Code,
								'context': $scope.inputData.Context.id,
								'tags': $scope.inputData.Tags,
								'language': $scope.inputData.Language.id,
								'code_type': $scope.inputData.Codetype.id,
						};
			$http({
		method: 'POST',
		url: 'http://172.17.42.1:6543/create/snippet',
		data:JSON.stringify(snap),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
				.success(function(data, status, headers, config) {
			console.log(data);
			console.log(status);
								})
		}
		}]);


//app.controller('starController', function($scope) {

	//$scope.rating = 5;

//});






app.controller('searchController', function($scope) {
		$scope.message = 'searchController page';
});

app.controller('exploreController', function($scope) {
		$scope.message = 'LexploreController page';
});



app.controller('requestController', function($scope) {
		$scope.message = 'requestController page';
});
