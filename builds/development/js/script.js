

 //-------------------------------

(function() {
	'use strict';

	var app = angular.module('myApp',['ngRoute']);
})();


 //-------------------------------
/* controller registeration */
angular
	.module('myApp')
	.controller('addQuestionController', addQuestionController);

/* dependency injection */
addQuestionController.$inject = ['$scope', '$http', '$location', 'optionsService', 'questionService'];

/* controller implementation */
function addQuestionController($scope, $http, $location, optionsService, questionService) {
    
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

        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/questions',
            data: JSON.stringify($scope.question),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                
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
addSnippetController.$inject = ['$scope', '$http', '$location', 'optionsService', 'snippetService'];

/* controller implementation */
function addSnippetController($scope, $http, $location, optionsService, snippetService) {

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

    // function compileSnippet() {
    //     snippetService.compileSnippet(JSON.stringify($scope.snippet.code)).success(function(data){
    //         console.log(data);
    //     })
    // }

    $scope.compileSnippet=function(){

        var snap = {
            'code': $scope.snippet.code
        };

        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/compile',
            data:JSON.stringify(snap),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            $scope.snippet.output = data.output;
            console.log(status);

        })
    }

    $scope.postSnippet=function(){
    var snap = {
            'title': $scope.snippet.title,
            'description': $scope.snippet.description,
            'code': $scope.snippet.code,
            'context': $scope.snippet.context.id,
            'tags': $scope.snippet.tags,
            'language': $scope.snippet.language.id,
            'code_type': $scope.snippet.code_type.id
    };

    $http({
        method: 'POST',
        url: 'http://www.koodet.com:6543/api/snippets',
        data:JSON.stringify(snap),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config) {
        console.log($scope.snippet.output)
        console.log(status);

    })
    }

    // function postSnippet() {
    //     prepareSnippet();
    //     snippetService
    //         .createSnippet($scope.snippet)
    //         .success(function(data) {
    //             console.log(data);
    //         })
    // }
}

 //-------------------------------







 //-------------------------------
angular
	.module('myApp')
	.controller('listLangsController', listLangsController);

function listLangsController($scope, $http, $routeParams) {
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
listSnippetsController.$inject = ['$scope', '$http', '$routeParams', 'snippetService', 'questionService'];

/* controller implementation */
function listSnippetsController($scope, $http, $routeParams, snippetService, questionService) {

	$scope.fetchSnippets = fetchSnippets;
	$scope.fetchQuestions = fetchQuestions;
	$scope.snippets = [];
	$scope.questions = [];

	function fetchSnippets() {
		snippetService
			.getLangSnippets($routeParams.lanid)
			.success(function(data){
				$scope.snippets = data;
				console.log($scope.snippets)
			});
	}

	function fetchQuestions() {
		questionService
			.getLangQuestions($routeParams.lanid)
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
LogoutController.$inject = ['$scope','$rootScope','$window'];

function LogoutController($scope,$rootScope, $location, $route) {
$scope.logout = function () {
	             //$route.reload();
                //localStorage.clearAll();
                //$location.path('/home');
                 $rootScope.currentUserLogedout = true;
            }
        }

 //-------------------------------
angular
  .module('myApp')
  .controller('PostController', PostController);
  PostController.$inject = ['$scope', '$http','$rootScope','$window'];


function PostController($scope, $http, $rootScope,$window) {
$scope.message = '';
    this.postForm = function() {


      
    var obj = {
            'username': $scope.inputData.username,
            'password': $scope.inputData.password
    };
    console.log(JSON.stringify(obj));

    $http({

      method: 'POST',
      url: 'http://www.koodet.com:6543/api/login',
      //withCredentials: true,  

      data:JSON.stringify(obj),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })

    .success(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      $rootScope.currentUserSignedIn = true;
      //Auth.setUser();
      $rootScope.username = data.username;
        })
    .error(function(data, status, headers, config) {
      $log.error("error handler message");
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
          $location.path('/question/:qid');

        })
   	}
}

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
	.controller('viewQuestionController', viewQuestionController);

function viewQuestionController($scope, $http, $routeParams, questionService) {
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

function viewSnippetController($scope, $http, $routeParams, snippetService) {
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
function configurator($routeProvider,$httpProvider) {

     //$httpProvider.defaults.withCredentials = true;
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
/*angular
	.module('myApp')
	.factory('Auth', Auth);

Auth.$inject = ['$http','$location'];


function Auth($http,$location) {

var user= {
        setUser : setUser,	
		isLoggedIn : isLoggedIn
};
return user;

function setUser(aUser) {
		return user = aUser;
	}

function isLoggedIn() {
		return isLogged: false;
	}

  }
*/

 //-------------------------------
angular
    .module('myApp')
    .factory('globalService', globalService);
   globalService.$inject = ['$http','$cookieStore', '$location', '$filter'];

    function globalService($http, $cookieStore, $location, $filter) {
    var service = {
        isAuth : isAuth,    
        setUser : setUser,
        getUser : getUser 
    };

    return service;
   globalService.user = null;

    function isAuth () {
        if (globalService.user == null) {
            globalService.user = $cookieStore.get('user');
        }
        return (globalService.user != null);
    }
    
    function setUser(newUser) {
        globalService.user = newUser;
        if (globalService.user == null) $cookieStore.remove('user');
        else $cookieStore.put('user', globalService.user);
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
langService.$inject = ['$http'];

/* service implementation */
function langService($http) {
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
optionsService.$inject = ['$http'];

/* service implementation */
function optionsService($http) {
	var service = {
		getOptions : getOptions
	};

	return service;

	function getOptions() {
		return $http
		.get('http://www.koodet.com:6543/api/elements');
	}

}

 //-------------------------------
angular
	.module('myApp')
	.factory('questionService', questionService);

function questionService($http) {
	var service = {
		getLangQuestions : getLangQuestions,	
		getQuestion : getQuestion,
		createQuestion : createQuestion	
	};

	return service;
	
	function getLangQuestions(langId) {
		return $http
		.get('http://www.koodet.com:6543/api/explore/' + langId + '/questions');
	}

	function getQuestion(qid) {
		return $http
		.get('http://www.koodet.com:6543/api/questions/' + qid);
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

function snippetService($http) {
	var service = {
		getLangSnippets : getLangSnippets,
		getSnippet : getSnippet,
		createSnippet : createSnippet
	};

	return service;
	
	function getLangSnippets(langId) {
		return $http
		.get('http://www.koodet.com:6543/api/explore/' + langId + '/snippets');
			
	}

	function getSnippet(sid) {
		return $http
		.get('http://koodet.com:6543/api/snippets/' + sid);
	}

	function createSnippet(snippet) {
		return $http
		.post('http://www.koodet.com:6543/api/snippets/', snippet);
	}	

	function compileSnippet(code) {
		return $http.post('http://www.koodet.com/6543/api/compile', code)
	}
}

 //-------------------------------
/* service registration */
angular
	.module('myApp')
	.factory('userService', userService);

/* dependency injection */
userService.$inject = ['$http'];

/* service implementation */
function userService($http) {
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