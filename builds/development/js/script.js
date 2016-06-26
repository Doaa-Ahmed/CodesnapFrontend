

 //-------------------------------

(function() {
	'use strict';

	var app = angular.module('myApp',['ngRoute' ,'ngCookies']);

})();


 //-------------------------------
/* controller registeration */
angular
	.module('myApp')
	.controller('addQuestionController', addQuestionController);

/* dependency injection */
addQuestionController.$inject = ['$scope', '$http', '$location', 'optionsService', 'questionService','authService'];

/* controller implementation */
function addQuestionController($scope, $http, $location, optionsService, questionService,authService) {
    
    $scope.question = {};
    $scope.options = {};
    $scope.postQuestion = postQuestion;
    $scope.populateOptions = populateOptions;
    $scope.prepareQuestion = prepareQuestion;

    function populateOptions() {
        optionsService
            .getOptions()
            .success(function(data) {
                $scope.options = data;    
            });
    }

    function prepareQuestion() {
        $scope.question.language = $scope.question.language.id;
        $scope.question.context = $scope.question.context.id;
        $scope.question.code_type = $scope.question.code_type.id;   

    }

    function postQuestion() {
        prepareQuestion();
        var snap = JSON.stringify($scope.question);
        console.log(snap);
        var object = {
              'Cookie': authService.getCookieData
      };

        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/questions',
            data: JSON.stringify($scope.question),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Cookie":JSON.stringify(object.access_token)
                
            },
            xhrFields: {
            withCredentials: true
        }
        })
        .success(function(data) {
            $location.path('/question/:qid');
            console.log(data);
        })
    }
}

 //-------------------------------
/* controller registeration */
angular
    .module('myApp')
    .controller('addSnippetController', addSnippetController);

/* dependency injection */
addSnippetController.$inject = ['$scope','$cookies', '$http', '$location', 'optionsService', 'snippetService','authService'];

/* controller implementation */
function addSnippetController($scope,$cookies, $http, $location, optionsService, snippetService,authService) {

    $scope.snippet = {};
    $scope.options = {};
    // $scope.postSnippet = postSnippet;
    $scope.populateOptions = populateOptions;
    $scope.prepareSnippet = prepareSnippet;
    // $scope.compileSnippet = compileSnippet
    // $scope.snippet.code = $scope.snippet.code;

    function populateOptions() {
        optionsService
            .getOptions()
            .success(function(data) {
                $scope.options = data;    
            });
    }

    function prepareSnippet() {
        $scope.snippet.language = $scope.snippet.language.id;
        $scope.snippet.context = $scope.snippet.context.id;
        $scope.snippet.code_type = $scope.snippet.code_type.id; 
    }


    $scope.compileSnippet=function(){

        var snap = {
            'code': $scope.snippet.code

        };
        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/compile',
            data:JSON.stringify(snap),
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
        
        })
        .success(function(data, status, headers, config) {
            $scope.snippet.output = data.output;
            console.log(status);

        })
    }

    $scope.postSnippet=function(){
    var snap = {
            'user_id':1, 
            'title': $scope.snippet.title,
            'description': $scope.snippet.description,
            'code': $scope.snippet.code,
            'context': $scope.snippet.context.id,
            'tags': $scope.snippet.tags,
            'language': $scope.snippet.language.id,
            'code_type': $scope.snippet.code_type.id,
            'user_id':$cookies.get("user_id")
    };

    $http({
        method: 'POST',
        url: 'http://www.koodet.com:6543/api/snippets',
        data:JSON.stringify(snap),
        crossDomain: true, 
        xhrFields: { withCredentials: true},
        headers: {'Content-Type': 'application/x-www-form-urlencoded' }
       })
    .success(function(data, status, headers, config) {
        console.log($scope.snippet.output);
        console.log(status);
        $location.path('/snippet/'+ data.snippet_id);

    })
    }

}

 //-------------------------------







 //-------------------------------
angular
	.module('myApp')
	.controller('listLangsController', listLangsController);

function listLangsController($scope, $http, $routeParams,authService) {
    $scope.languages = [];
	$scope.fetchLangs = fetchLangs;

    function fetchLangs() {
        
    }
}

 //-------------------------------
/* controller registeration */
angular
	.module('myApp')
	.controller('listSnippetsController', listSnippetsController);

/* dependency injection */
listSnippetsController.$inject = ['$scope', '$http', '$routeParams', 'snippetService', 'questionService','authService'];

/* controller implementation */
function listSnippetsController($scope, $http, $routeParams, snippetService, questionService,authService) {

	$scope.fetchSnippets = fetchSnippets;
	$scope.fetchQuestions = fetchQuestions;
	$scope.snippets = [];
	$scope.questions = [];

	function fetchSnippets() {
		snippetService
			.getLangSnippets($routeParams.feature,$routeParams.fname)
			.success(function(data){
				$scope.snippets = data;
				console.log($scope.snippets)
			});
	}

	function fetchQuestions() {
		questionService
			.getLangQuestions($routeParams.feature,$routeParams.fname)
			.success(function(data) {
				console.log(data);
				$scope.questions = data;
				console.log($scope.questions)
			})
	}

}


 //-------------------------------
angular
  .module('myApp')
  .controller('LogoutController', LogoutController);
LogoutController.$inject = ['$http','$scope','$rootScope','$location','authService','$cookies'];

function LogoutController($http,$scope,$rootScope, $location,authService,$cookies) {
  $scope.logout = logout;
    
    function logout() {
      
       $rootScope.currentUserSignedIn=false;
        //$rootScope.userInfo = authService.getCookieData;
        //console.log(status);
        //console.log("hi");
        //$cookies.remove("auth");
        authService.clearCookieData();
        //console.log("hey");
        $location.path('/');
      }
  }

 //-------------------------------
angular
  .module('myApp')
  .controller('PostController', PostController);

PostController.$inject = ['$scope', '$http','$rootScope','authService','$cookies'];

function PostController($scope, $http, $rootScope,authService,$cookies) {
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
        xhrFields: {withCredentials: true},
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}

      })
        .success(function(data, status, headers, config) {

        console.log(data);
        console.log(status);
        $rootScope.currentUserSignedIn =true;

        authService.setCookieData(data);
        $rootScope.username = data.username;
        
      })
      .error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
      });
  } 
}

 //-------------------------------
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





 //-------------------------------
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
        	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          xhrFields: {withCredentials: true}
        })
        .success(function(data, status, headers, config) {
        	console.log(data);
        	console.log(status);
          $location.path('/question/'+ data.question_id);

        })
   	}
}

 //-------------------------------
angular
	.module('myApp')
	.config(configurator)
function configurator($routeProvider,$httpProvider) {
	$routeProvider
    // route for the home page
        .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'PostController',
                
        })
        .when('/register', {
                templateUrl : 'pages/Signup.html',
                controller  : 'signupController',
                
        })
        //.when('/Logout', {
          //      templateUrl : '',
            //controller  : 'LogoutController'

        //})
        // route for the about page
        .when('/search', {
                templateUrl : 'pages/search.html',
                controller  : 'searchController',
                
        })
        // route for the about page
        .when('/explore', {
        		templateUrl : 'pages/list.langs.html',
                controller : 'listLangsController',
                
        })
        .when('/language/:lanid', {
                templateUrl: 'pages/langsnippets.html',
                controller: 'listSnippetsController',
        })
        .when('/snippet/:sid', {
                templateUrl: 'pages/view.snippet.html',
                controller: 'viewSnippetController',
        })
        .when('/question/:qid', {
                templateUrl: 'pages/view.question.html',
                controller: 'viewQuestionController',
        })
        // route for the about page
        .when('/add', {
                templateUrl : 'pages/add.snippet.html',
                controller  : 'addSnippetController',
        })
        // route for the contact page
        .when('/request', {

                templateUrl : 'pages/request.html',
                controller  : 'requestController'
        })
        .otherwise({
        		redirectTo: 'pages/home.html',
                //withCredentials: true
        });

}	
/*app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            //$location.path('/home');
        }
        else {
            console.log('ALLOW');
            //$location.path('/home');
        }
    });
}]);

/*app.run(['$rootScope', '$location', 'Auth',function($rootScope, $location, $route,Auth) {

    var routesOpenToPublic = [];
    angular.forEach($route.routes, function(route, path) {
        // push route onto routesOpenToPublic if it has a truthy publicAccess value
        route.publicAccess && (routesOpenToPublic.push(path));
    });

    $rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc) {
        var closedToPublic = (-1 == routesOpenToPublic.indexOf($location.path()));
        if(closedToPublic && !user.isLoggedIn()) {
            $location.path('/home');
        }
    });
}]);*/



 //-------------------------------
angular
	.module('myApp')
	.controller('searchController',searchController);

function searchController($scope,$rootScope, $location) {
$scope.isActive = function (viewLocation) {
	             return viewLocation === $location.path();
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
			crossDomain: true, 
             xhrFields: { withCredentials: true},
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
    		var object= {
              'Cookie': authService.getCookieData()
      };

    	    $http({
				method: 'POST',
				url: 'http://www.koodet.com:6543/api/snippets',
				data:JSON.stringify(snap),
				headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          "Cookie":JSON.stringify(object.access_token)
			             },
                         xhrFields: {
            withCredentials: true
        }
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
	.controller('viewQuestionController', viewQuestionController);

function viewQuestionController($scope, $http, $routeParams, questionService,authService) {
	$scope.fetchQuestion = fetchQuestion;
	$scope.question = {};
	

	function fetchQuestion() {
		questionService
			.getQuestion($routeParams.qid)
			.success(function(data) {
				$scope.question = data;
			})
	}

}

 //-------------------------------
angular
	.module('myApp')
	.controller('viewSnippetController', viewSnippetController);

function viewSnippetController($scope, $http, $routeParams, snippetService,authService) {
	$scope.fetchSnippet = fetchSnippet;
	$scope.snippet = {};

	function fetchSnippet() {
		snippetService
			.getSnippet($routeParams.sid)
			.success(function(data) {
				$scope.snippet = data;
			});
	}
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
    .config(configurator)

function configurator($routeProvider, $httpProvider, $locationProvider) {

    //$httpProvider.defaults.withCredentials = true;
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'PostController',

        })
        .when('/register', {
            templateUrl: 'pages/Signup.html',
            controller: 'signupController',

        })
        //.when('/Logout', {
        //      templateUrl : '',
        //controller  : 'LogoutController'

    //})

       .when('/profile', {
             templateUrl : 'pages/userprofile.html',
             controller  : 'profileController',
                
        })

    // route for the about page
       .when('/search', {
            templateUrl: 'pages/search.html',
            controller: 'searchController',

        })
        // route for the about page
        .when('/explore', {
            templateUrl: 'pages/list.langs.html',
            controller: 'listLangsController',

        })
        .when('/snippet/:sid', {
            templateUrl: 'pages/view.snippet.html',
            controller: 'viewSnippetController',
        })
        .when('/question/:qid', {
            templateUrl: 'pages/view.question.html',
            controller: 'viewQuestionController',
        })

        .when('/:feature/:fname', {
            templateUrl: 'pages/langsnippets.html',
            controller: 'listSnippetsController',
        })

        // route for the about page
        .when('/add', {
            templateUrl: 'pages/add.snippet.html',
            controller: 'addSnippetController',
        })
        // route for the contact page
        .when('/request', {

            templateUrl: 'pages/request.html',
            controller: 'requestController'
        })
        .otherwise({
            redirectTo: '/',
            //withCredentials: true
        });

        $locationProvider.html5Mode(true);

    // if (window.history && window.history.pushState) {
    //     //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

    //     // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

    //     // if you don't wish to set base URL then use this
    //     $locationProvider.html5Mode({
    //         enabled: true,
    //         requireBase: false
    //     });
    // }
}
/*app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {
        if (Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            //$location.path('/home');
        }
        else {
            console.log('ALLOW');
            //$location.path('/home');
        }
    });
}]);
/*app.run(['$rootScope', '$location', 'Auth',function($rootScope, $location, $route,Auth) {
    var routesOpenToPublic = [];
    angular.forEach($route.routes, function(route, path) {
        // push route onto routesOpenToPublic if it has a truthy publicAccess value
        route.publicAccess && (routesOpenToPublic.push(path));
    });
    $rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc) {
        var closedToPublic = (-1 == routesOpenToPublic.indexOf($location.path()));
        if(closedToPublic && !user.isLoggedIn()) {
            $location.path('/home');
        }
    });
}]);*/


 //-------------------------------
angular
	.module('myApp')
	.factory('authService', authService);

authService.$inject = ['$cookies'];


function authService($cookies,$http,$location,$rootScope) {
		var service =  {
			setCookieData: setCookieData,
			//getCookieData: getCookieData,
			clearCookieData: clearCookieData,
			getaccess_token:getaccess_token
			//getAuthStatus:getAuthStatus
		};

		return service;

		function setCookieData(data) {

				//$cookies["user_id"] = data.user_id;
				//$cookies["user_name"]= data.username;
				//$cookies["access_token"]= data.token;
				//$cookies["currentUserSignedIn"] = true;
				$cookies.put("user_id",data.user_id);
				$cookies.put("user_name",data.username);
				$cookies.put("access_token",data.token);

		}


		function getaccess_token() {
			var access_token=$cookies.get("access_token");
				return access_token;
		}

		function getuser_id() {
			var user_id = $cookies.get("user_id");
			return user_id;
		}

		function getuser_name(){
			var user_name = $cookies.get("user_name");
			return user_name;
		}

		function clearCookieData() {
				$cookies.remove("user_id");
				$cookies.remove("user_name");
				$cookies.remove("access_token");
				$cookies.remove("currentUserSignedIn");

		}

	/* function getAuthStatus(){

	 	var status=$cookies.get('auth');
	 	if (status){
	 		return true;
	 	}else{
	 		return false;
	 	}
	 }*/

  }


 //-------------------------------
angular
    .module('myApp')
    .factory('globalService', globalService);
   globalService.$inject = ['$http','$cookies', '$location', '$filter','authService'];

    function globalService($http, $cookies, $location, $filter,authService) {
    var service = {
        isAuth : isAuth,    
        setUser : setUser,
        getUser : getUser 
    };

    return service;
   globalService.user = null;

    function isAuth () {
        if (globalService.user == null) {
            globalService.user = $cookies.get('user');
        }
        return (globalService.user != null);
    }
    
    function setUser(newUser) {
        globalService.user = newUser;
        if (globalService.user == null) $cookies.remove('user');
        else $cookies.put('user', globalService.user);
    }
    function getUser() {
                return globalService.user;

    }

}

 //-------------------------------
/* service registration */
angular
	.module('myApp')
	.factory('langService', langService);

/* dependency injection */
langService.$inject = ['$http','authService'];

/* service implementation */
function langService($http,authService) {
	var service = {
		getLangs : getLangs,
		getLang : getLang
	};

	return service;

	function getLangs() {
		//get all languages
	}

	function getLang(langId) {
		//get a specific language
	}
}

 //-------------------------------
/* service registration */
angular
	.module('myApp')
	.factory('optionsService', optionsService);

/* dependency injection */
optionsService.$inject = ['$http','authService','$cookies'];

/* service implementation */
function optionsService($http,authService,$cookies) {
		//var object =authService.getaccess_token();
	var service = {
		getOptions : getOptions
	};

	return service;
   // var obj =$cookies.get("access_token");
	function getOptions() {
		return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/elements',
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                
         })
	}

}

 //-------------------------------
angular
	.module('myApp')
	.factory('questionService', questionService);

function questionService($http,authService) {
	    var object = authService.getCookieData;

	var service = {
		getLangQuestions : getLangQuestions,	
		getQuestion : getQuestion,
		createQuestion : createQuestion	
	};

	return service;
	

	function getLangQuestions(feature,fname) {
		return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/explore/'+feature+'/'+ fname + '/questions',
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                
         })
	}

	function getQuestion(qid) {
		return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/questions/' + qid,
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                
         })
		
	}

	function createQuestion(question) {
		return $http
		.post('http://www.koodet.com:6543/api/questions/', question)
	}
}

 //-------------------------------
angular
	.module('myApp')
	.factory('snippetService', snippetService);

function snippetService($http,authService,$cookies) {
	var service = {
		getLangSnippets : getLangSnippets,
		getSnippet : getSnippet,
		createSnippet : createSnippet
	};

	return service;
	

	function getLangSnippets(feature,fname) {

		var obj =$cookies.get("access_token");
	    return $http({
	            method: 'GET',
	            url: 'http://www.koodet.com:6543/api/explore/' +feature+'/'+ fname + '/snippets',
	            crossDomain: true, 
	            xhrFields: { withCredentials: true},
	            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
	                
	         })
	}

	function getSnippet(sid) {
		//var obj =$cookies.get("access_token");
        return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/snippets/' + sid,
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {"Cookie":"obj"}
	})
}

	function createSnippet(snippet) {
		//var obj =$cookies.get("access_token");
		return $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/snippets/',
            data: snippet,
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
           
	})
	
    }	
	
	function compileSnippet(code) {
		var obj =$cookies.get("access_token");
		return $http({
            method: 'POST',
            url: 'http://www.koodet.com/6543/api/compile', code,
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
	})
	
    }
}

 //-------------------------------
/* service registration */
angular
	.module('myApp')
	.factory('userService', userService);

/* dependency injection */
userService.$inject = ['$http','authService'];

/* service implementation */
function userService($http,authService) {
	var service = {
		getUser : geUser,
		createUser : createUser
	};

	return service;

	function getUser(uid) {
		return $http
		.get('http://www.koodet.com:6543/api/elements');
	}

}