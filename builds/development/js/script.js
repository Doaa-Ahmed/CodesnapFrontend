

 //-------------------------------
var app = 

angular
    .module('myApp',['ngRoute']);



 //-------------------------------
angular
	.module('myApp')
	.controller('addSnippetController', addSnippetController);


function addSnippetController($scope, $http) {

	$http.get("http://www.koodet.com:6543/api/elements")
        .success(function(data) {
         	$scope.result=data;
         	console.log(data);
			console.log(status);
			$scope.lan = [];
			angular.forEach($scope.result.language, function(item) {
                $scope.lan.push(item);
            });

		    $scope.con = [];
			angular.forEach($scope.result.context, function(item) {
                $scope.con.push(item);
            });

			$scope.typ = [];
			angular.forEach($scope.result.code_type, function(item) {
                $scope.typ.push(item);
            });
         
        });

        $scope.Postsnippet=function(){
            var snap = {
                'title': $scope.inputData.Title,
                'description': $scope.inputData.Description,
                'code': $scope.inputData.Code,
                'context': $scope.inputData.Context.id,
                'tags': $scope.inputData.Tags,
                'language': $scope.inputData.Language.id,
                'code_type': $scope.inputData.Codetype.id,
            };

            $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/snippets',
                data:JSON.stringify(snap),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })

            .success(function(data, status, headers, config) {
                console.log(data);
                console.log(status);

            })
        }   
}

 //-------------------------------







 //-------------------------------
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

 //-------------------------------
angular
	.module('myApp')
	.controller('listSnippetsController', listSnippetsController);

function listSnippetsController($scope, $http) {

	$scope.fetchSnippets = fetchSnippets;
	$scope.snippets = [];
	
	function fetchSnippets(langId) {
		$http.get('http://www.koodet.com:6543/api/explore/' + langId + '/snippets')
		.success(function(data) {
			$scope.snippets = data;

		})	
	}
	
}

 //-------------------------------
angular
  .module('myApp')
  .controller('PostController', PostController);

function PostController($scope, $http, $rootScope) {
    this.postForm = function() {
      
    var obj = {
            'username': $scope.inputData.username,
            'password': $scope.inputData.password
    };
    console.log(JSON.stringify(obj));

    $http({

      method: 'POST',
      url: 'http://www.koodet.com:6543/api/login',
      data:JSON.stringify(obj),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
            $rootScope.currentUserSignedIn = true;
            // $rootScope.currentUser.username = data.username;
        })
    .error(function(data, status, headers, config) {
      //$scope.errorMsg = 'Unable to submit form';
      console.log(data);
      console.log(status);
        });


    this.signupForm = function() {
        var upobject = {
                'first_name':$scope.signupData.firstname,
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
          url: 'http://www.koodet.com:6543/api/users',
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
        });
      }
    
  } 

}

 //-------------------------------
angular
	.module('myApp')
	.controller('requestController', requestController);

function requestController($scope, $http) {

	$http.get("http://www.koodet.com:6543/api/elements")
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
    		'title': $scope.inputData.Title,
            'description': $scope.inputData.Description,
           	'context': $scope.inputData.Context.id,
            'tags': $scope.inputData.Tags,
            'language': $scope.inputData.Language.id,
            'code_type': $scope.inputData.Codetype.id,
        };

        $http({
        	method: 'POST',
        	url: 'http://www.koodet.com:6543/api/questions',
        	data:JSON.stringify(snap),
        	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
        	console.log(data);
        	console.log(status);

        })
   	}
}

 //-------------------------------
angular
  .module('myApp')
  .controller('signupController', signupController);

function signupController($scope, $http) {

	this.signupForm = function() {
		var	upobject = {
			 		'first_name':$scope.signupData.firstname,
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
			url: 'http://www.koodet.com:6543/api/users',
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
}

 //-------------------------------
angular
	.module('myApp')
	.controller('snippetController', snippetController);

function snippetController($scope, $http) {

	$scope.Postsnippet = function() {
    	var snap = {
    			'title': $scope.inputData.Title,
            	'description': $scope.inputData.Description,
    			'code': $scope.inputData.Code,
    			'context': $scope.inputData.Context.id,
    			'tags': $scope.inputData.Tags,
    			'language': $scope.inputData.Language.id,
    			'code_type': $scope.inputData.Codetype.id,
    		};

    	    $http({
				method: 'POST',
				url: 'http://www.koodet.com:6543/api/snippets',
				data:JSON.stringify(snap),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data, status, headers, config) {
			console.log(data);
			console.log(status);

            })
	}
}

 //-------------------------------
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

 //-------------------------------
angular
	.module('myApp')
	.directive('starRating', starRating);

function starRating() {

    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index +1;
          scope.onRatingSelected({rating: index +1});
        };

        scope.$watch('ratingValue', function(newVal, oldVal) {
          if (newVal || newVal === 0) {
            updateStars();
          }
        });
      }
    }	
}

 //-------------------------------
angular
	.module('myApp')
	.config(configurator);

function configurator($routeProvider) {

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
        })
        .when('/language/:lanid', {
                templateUrl: 'pages/langsnippets.html',
                controller: 'listSnippetsController'
        })
        // route for the about page
        .when('/add', {
                templateUrl : 'pages/add.html',
                controller  : 'addSnippetController'
        })
        // route for the contact page
        .when('/request', {
                templateUrl : 'pages/request.html',
                controller  : 'requestController'
        })
        .otherwise({
        		redirectTo: 'pages/Signin.html'
        });
}	

 //-------------------------------
angular
	.module('myApp')
	.factory('option', option);

option.$inject = ['$http'];

function option() {
	return {
		getOptions: getOptions
	};

	function getOptions() {
		return $http.get('http://www.koodet.com:6543/api/options')
			.then(getOptionsComplete)
			.catch(getoptionsFailed)

		function getOptionsComplete(response) {
			return response.data;
		}

		function getOptionsFailed(error) {
			//logger.error("Failed"+ error.data);

		}

	}
}

 //-------------------------------
angular
	.module('myApp')
	.factory('Snippet', Snippet);

function Snippet($http) {
	var Snippet = {};

	Snippet.getLangSnippets = function(langId) {
		return $http.get('http://www.koodet.com:6543/api/explore/' + langId + '/snippets').success(function(response) {
			return response.data;
		})
	}
}