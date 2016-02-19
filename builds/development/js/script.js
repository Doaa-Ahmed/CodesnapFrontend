

 //-------------------------------
  var app = angular.module('myApp', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'PostController'
            })
            .when('/register', {
                templateUrl : 'pages/Signup.html',
                controller  : 'signupController'
            })
            
            
            // route for the about page
            .when('/search', {
                templateUrl : 'pages/search.html',
                controller  : 'searchController'
            })

            // route for the about page
            .when('/explore', {
                templateUrl : 'pages/explore.html',
                controller  : 'exploreController'
            })
            // route for the about page
            .when('/add', {
                templateUrl : 'pages/add.html',
                controller  : 'addController'
            })

            // route for the contact page
            .when('/request', {
                templateUrl : 'pages/request.html',
                controller  : 'requestController'
            })

             .otherwise({redirectTo: 'pages/Signin.html'});
    });



 //-------------------------------
		app.controller('PostController', ['$scope', '$http', function($scope, $http) {
		
		this.postForm = function() {
		var obj = {'username': $scope.inputData.username,'password': $scope.inputData.password};
			console.log(JSON.stringify(obj));

			$http({
				method: 'POST',
				url: 'http://41.45.130.227:6543/login',
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
				url: 'http://41.45.130.227:6543/signup',
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

	app.controller('searchController', function($scope) {
        $scope.message = 'searchController page';
    });

    app.controller('exploreController', function($scope) {
        $scope.message = 'LexploreController page';
    });

    app.controller('addController', function($scope) {
        $scope.message = 'addController page';
    });

    app.controller('requestController', function($scope) {
        $scope.message = 'requestController page';
    });

 //-------------------------------
console.log("hi");

 //-------------------------------
//test1.js

 //-------------------------------
//test2.js