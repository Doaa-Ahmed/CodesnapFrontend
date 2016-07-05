

 //-------------------------------
(function() {
	'use strict';

	var app = angular.module('myApp',['ngRoute' ,'ngCookies','ui.ace']);
	
	app.config(function ($httpProvider) {
		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
	});

})();

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
    // $scope.compileSnippet = compileSnippet
    // $scope.snippet.code = $scope.snippet.code;

    function populateOptions() {
        optionsService
            .getOptions()
            .success(function(data) {
                $scope.options = data;    
            });
    }

    $scope.postSnippet=function(){
    var snap = {
            'user_id':1, 
            'title': $scope.snippet.title,
            'description': $scope.snippet.description,
            'code': $scope.snippet.code,
            'context': $scope.snippet.context.id,
            'tags': $scope.snippet.tags,
            'language': $scope.snippet.language[0],
            'code_type': $scope.snippet.code_type.id,
            'user_id':$cookies.get("user_id")
    };
    console.log(snap);

    $http({
        method: 'POST',
        url: 'http://www.koodet.com:6543/api/snippets',
        data:JSON.stringify(snap),
        crossDomain: true, 
        xhrFields: { withCredentials: true},
        headers: {'Content-Type': 'application/x-www-form-urlencoded' }
       })
    .success(function(data, status, headers, config) {
        //console.log($scope.snippet.output);
        console.log(status);
        $location.path('/snippet/'+ data.snippet_id);

    })
    }

}

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
			})
	}

}


 //-------------------------------
angular
    .module('myApp')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$http', '$rootScope', 'authService', '$cookies'];

function loginController($scope, $http, $rootScope, authService, $cookies) {
    this.postForm = function() {
        var obj = {
            'username': $scope.inputData.username,
            'password': $scope.inputData.password
        };

        console.log(JSON.stringify(obj));

        $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/login',
                data: JSON.stringify(obj),
                xhrFields: { withCredentials: true },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            })
            .success(function(data, status, headers, config) {

                console.log(data);
                console.log(status);

                authService.setCookieData(data);
                $rootScope.username = data.username;
                $scope.messageerror = "ERROR,PLEASE ENTER A VALID DATA";
                if (data.successful) {
                    $rootScope.currentUserSignedIn = true;
                } else {
                    $scope.messageerror;
                    $rootScope.currentUsernotSignedIn = true;
                }

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
    .controller('LogoutController', LogoutController);

LogoutController.$inject = ['$http', '$scope', '$rootScope', '$location', 'authService', '$cookies'];

function LogoutController($http, $scope, $rootScope, $location, authService, $cookies) {
    $scope.logout = logout;

    function logout() {

        $rootScope.currentUserSignedIn = false;
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
    .controller('profileController', profileController);

profileController.$inject = ['$scope', '$cookies', '$http', '$location'];

function profileController($scope, $cookies, $http, $location) {

    var user_id = $cookies.get("user_id");

    $http({
        method: 'GET',
        url: 'http://www.koodet.com:6543/api/users/' + user_id,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        xhrFields: { withCredentials: true }
    }).success(function(data) {
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

function requestController($scope, $cookies, $http, $location, authService) {
    
    $scope.snippet = {};
    
    $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/elements',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            xhrFields: { withCredentials: true }
        })
        .success(function(data) {
            $scope.result = data;
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

    $scope.Postquestion = function() {

        var snap = {
            'user_id': 1,
            'title': $scope.inputData.Title,
            'description': $scope.inputData.Description,
            'context': $scope.inputData.Context.id,
            'tags': $scope.inputData.Tags,
            'language': $scope.inputData.Language.id,
            'code_type': $scope.inputData.Codetype.id,
            'user_id': $cookies.get("user_id")
        };
        //var object = authService.getCookieData;
        //var object = $cookies.get('auth');

        $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/questions',
                data: JSON.stringify(snap),
                crossDomain: true,
                xhrFields: { withCredentials: true },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data, status, headers, config) {
                console.log(data);
                console.log(status);
                $location.path('/question/' + data.question_id);

            })
    }
}

 //-------------------------------
angular
    .module('myApp')
    .controller('searchController', searchController);

function searchController($scope, $rootScope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    }
}

 //-------------------------------
angular
    .module('myApp')
    .controller('signupController', signupController);

function signupController($scope, $http, $rootScope) {

    this.signupForm = function() {
        var upobject = {
            'first_name': $scope.signupData.firstname,
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
            data: JSON.stringify(upobject),
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })

        .success(function(data, status, headers, config) {
                //window.location.href = 'index.html';
                console.log(data);
                console.log(status);
                $scope.errorMsg = data.massage;
                if (data.massage == "success") {
                    $rootScope.correctsubmit = true;
                }

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
        var object = {
            'Cookie': authService.getCookieData()
        };

        $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/snippets',
                data: JSON.stringify(snap),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Cookie": JSON.stringify(object.access_token)
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
        var obj = { rating: rating };

        $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api',
                data: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
    .controller('userprofileController', userprofileController);

userprofileController.$inject = ['$scope','$cookies','$routeParams','$http','$location'];

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





 //-------------------------------
angular
    .module('myApp')
    .controller('viewQuestionController', viewQuestionController);

function viewQuestionController($scope, $http, $routeParams, $cookies, $route, questionService, authService) {
    $scope.fetchQuestion = fetchQuestion;
    $scope.addAnswer = addAnswer;
    $scope.new_answer = {};
    $scope.question = {};
    $scope.question.answers = [];

    $scope.compileSnippet = function(code) {

        var snap = {
            'code': code

        };
        $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/compile',
                data: JSON.stringify(snap),
                crossDomain: true,
                xhrFields: { withCredentials: true },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            })
            .success(function(data, status, headers, config) {
                $scope.new_answer.output = data.output;
                console.log(status);

            })
    }


    function fetchQuestion() {
        questionService
            .getQuestion($routeParams.qid)
            .success(function(data) {
                $scope.question = data;
            })
    }

    function addAnswer() {

        var answer = {
            "user_id": $cookies.get("user_id"),
            "description": $scope.new_answer.description,
            "code": $scope.snippet.code,
            "question": $scope.question.question_id

        };

        $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/answers',
                data: JSON.stringify(answer),
                crossDomain: true,
                xhrFields: { withCredentials: true },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            })
            .success(function(data, status, headers, config) {
                $scope.new_answer = {};
                $route.reload();
                console.log(status);

            })



    }

}

 //-------------------------------
angular
    .module('myApp')
    .controller('viewSnippetController', viewSnippetController);

function viewSnippetController($scope, $http, $routeParams, $location, $route, $cookies, snippetService, authService) {

    $scope.fetchSnippet = fetchSnippet;
    $scope.getRelated = getRelated;
    $scope.addComment = addComment;
    $scope.snippet = {};
    $scope.new_comment = "";
    $scope.snippet.comments = [];

    function fetchSnippet() {
        snippetService
            .getSnippet($routeParams.sid)
            .success(function(data) {
                $scope.snippet = data;
            });
    }

    function getRelated() {
        snippetService
            .getSnippets()
            .success(function(data) {
                $scope.related = data;
            });
    }

    $scope.aceLoaded = function(_editor) {
        // Options
        

        _editor.setVale(snippet.code);
        _editor.setReadOnly(true);

    };

    function addComment() {

        var comment = {

            "user_id": $cookies.get("user_id"),
            "description": $scope.new_comment,
            "snippet": $scope.snippet.snippet_id
        };

        $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/comments',
                data: JSON.stringify(comment),
                crossDomain: true,
                xhrFields: { withCredentials: true },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

            })
            .success(function(data, status, headers, config) {
                $scope.new_comment = "";
                $route.reload();

            })
    }
}

 //-------------------------------
angular
    .module('myApp')
    .directive('compileEditor', compileEditor);

// in html use <compileEditor></compileEditor>

function compileEditor() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/compilerEdit.html',
        controller: compileController,
        bindToController: true,
    };

    return directive;

    compileController.$inject = ['$scope', '$http', 'compileService'];

    function compileController($scope, $http, compileService) {

        $scope.snippet = {};

        $scope.snippet.compileSnippet = compileSnippet

        compileService.getLanguages().then(
            function(response) {
                $scope.snippet.languages = response.data.languages;
            });

        function compileSnippet() {
            $('#output').empty();
            $('#time').empty();

            compileService.compileSnippet($scope.snippet.language[1], $scope.snippet.code, $scope.snippet.stdin).then(
                function(response) {
                    $scope.snippet.output = response.data.output;
                    //console.log(response.data.output);

                    $scope.checkCodeandPrint($scope.snippet.output);
                });
        }

        $scope.checkCodeandPrint = function(output) {
            console.log(output);
            if (output.search('runtime') !== -1) {
                var outSplit = output.split('runtime');
                var output = outSplit[0];
                var time = outSplit[1];
                $('#output').html(output);
                $('#time').html('<br>' + "<b>runtime<i>" + time + "</i></b>");
                return 1;
            } else {
                $('#output').html(output);
                return 0;
            }
        }

        $scope.aceLoaded = function(_editor) {
            //var _renderer = _editor.renderer;
            $scope._editor = _editor;
            $scope._session = _editor.getSession();
        };

        $scope.aceChanged = function(e) {
            //angular.element(document.querySelector('#lang'))
            $scope.snippet.code = $scope._session.getDocument().getValue();
        };

        $scope.aceUpdate = function() {
            $scope.snippet.mode = $scope.snippet.language[1];
            if ($scope.snippet.mode == 'C-C++') {
                $scope.snippet.mode = 'c_cpp';
            } else if ($scope.snippet.mode == 'C#') {
                $scope.snippet.mode = 'csharp';
            } else if ($scope.snippet.mode == 'Go') {
                $scope.snippet.mode = 'golang';
            }

            compileService.getLangSample($scope.snippet.language[0]).then(
                function(response) {
                    $scope.snippet.codeSample = response.data.code;
                    $scope._editor.setValue($scope.snippet.codeSample, -1);
                    $scope._session.setMode("ace/mode/" + angular.lowercase($scope.snippet.mode));
                    console.log("ace/mode/" + angular.lowercase($scope.snippet.mode));
                });
        }

    }
}

 //-------------------------------
angular
    .module('myApp')
    .directive('compileViewer', compileViewer);

// in html use <compileViewer></compileViewer>

function compileViewer() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/compilerView.html',
        controller: compileController,
        bindToController: true,
        link: function (scope,element,attrs){}
    };

    return directive;

    compileController.$inject = ['$scope', '$http', '$routeParams', 'compileService', 'snippetService'];

    function compileController($scope, $http, $routeParams, compileService, snippetService) {

        $scope.snippetView = {};

        snippetService.getSnippet($routeParams.sid)
                .success(function(data) {
                    $scope.snippetView = data;
                    // $scope.snippetView.language = data.language;
                    // $scope.snippetView.code = data.code;

                    $scope.mode = $scope.snippetView.language;
                    if ($scope.mode == 'C-C++') {
                        $scope.mode = 'c_cpp';
                    } else if ($scope.mode == 'C#') {
                        $scope.mode = 'csharp';
                    } else if ($scope.mode == 'Go') {
                        $scope.mode = 'golang';
                    }
                    $scope._session.setMode("ace/mode/" + angular.lowercase($scope.mode));
                })
                .error(function(data){
                    $scope.mode = $scope.question.language;
                    if ($scope.mode == 'C-C++') {
                        $scope.mode = 'c_cpp';
                    } else if ($scope.mode == 'C#') {
                        $scope.mode = 'csharp';
                    } else if ($scope.mode == 'Go') {
                        $scope.mode = 'golang';
                    }
                    $scope._session.setMode("ace/mode/" + angular.lowercase($scope.mode));
        });

        $scope.compileSnippetView = compileSnippetView

        function compileSnippetView() {
            $('#output').empty();
            $('#time').empty();

            var code = ($scope.snippetView.code !== undefined ? $scope.snippetView.code: $scope.answer.code );
            var language = ($scope.snippetView.language !== undefined ? $scope.snippetView.language: $scope.question.language );

            compileService.compileSnippet(language, code, $scope.snippetView.stdin).then(
                function(response) {
                    $scope.snippetView.output = response.data.output;
                    //console.log(response.data.output);

                    $scope.checkCodeandPrint($scope.snippetView.output);
                });
        }

        $scope.checkCodeandPrint = function(output) {
            if (output.search('runtime') !== -1) {
                var outSplit = output.split('runtime');
                var output = outSplit[0];
                var time = outSplit[1];
                $('#output').html(output);
                $('#time').html('<br>' + "<b>runtime<i>" + time + "</i></b>");
                return 1;
            } else {
                $('#output').html(output);
                return 0;
            }
        }

        $scope.aceLoaded = function(_editor) {
            _editor.setReadOnly(true);
            $scope._session = _editor.getSession();
        };

        $scope.aceChanged = function(e) {
            //angular.element(document.querySelector('#lang'))
            //$scope.snippetView.code = $scope._session.getDocument().getValue();
        };

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
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'loginController',

        })
        .when('/register', {
            templateUrl: 'pages/Signup.html',
            controller: 'signupController',

        })
        .when('/profile', {
            templateUrl: 'pages/userprofile.html',
            controller: 'profileController',

        })
        .when('/profile/:username', {
            templateUrl: 'pages/profile.html',
            controller: 'userprofileController',

        })
        .when('/search', {
            templateUrl: 'pages/search.html',
            controller: 'searchController',

        })
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
}

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
    .factory('compileService', compileService);

function compileService($http) {
    var service = {};

    service.getLanguages = getLanguages;
    service.getLangSample = getLangSample;
    service.compileSnippet = compileSnippet;

    return service;

    function getLanguages() {
        return $http.get('http://www.koodet.com:6543/api/languages')
                    .then(handleSuccess, handleError('Error getting Languages'));
    }

    function getLangSample(languageID) {
        return $http.get('http://www.koodet.com:6543/api/compile/' + languageID)
                    .then(handleSuccess, handleError('Error getting Languages'));
    }

    function compileSnippet(language, snippet, stdin) {
        return $http.post('http://www.koodet.com:6543/api/compile', {"language":language, "snippet":snippet, "stdin":stdin})
                    .then(handleSuccess, handleError('Error creating presentation'));
    }

    function handleSuccess(res) {
        return { success: true, data: res.data };
    }

    function handleError(error) {
        return { success: false, message: error };
    }

}

 //-------------------------------
angular
    .module('myApp')
    .factory('globalService', globalService);

globalService.$inject = ['$http', '$cookies', '$location', '$filter', 'authService'];

function globalService($http, $cookies, $location, $filter, authService) {
    var service = {
        isAuth: isAuth,
        setUser: setUser,
        getUser: getUser
    };

    return service;
    globalService.user = null;

    function isAuth() {
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
angular
    .module('myApp')
    .factory('langService', langService);

langService.$inject = ['$http', 'authService'];

function langService($http, authService) {
    var service = {
        getLangs: getLangs,
        getLang: getLang
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
optionsService.$inject = ['$http', 'authService', '$cookies'];

/* service implementation */
function optionsService($http, authService, $cookies) {
    //var object =authService.getaccess_token();
    var service = {
        getOptions: getOptions
    };

    return service;
    // var obj =$cookies.get("access_token");
    function getOptions() {
        return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/elements',
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

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

function snippetService($http, authService, $cookies) {
    var service = {
        getLangSnippets: getLangSnippets,
        getSnippet: getSnippet,
        getSnippets: getSnippets,
        createSnippet: createSnippet
    };

    return service;

    function getLangSnippets(feature, fname) {

        var obj = $cookies.get("access_token");
        return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/explore/' + feature + '/' + fname + '/snippets',
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        })
    }

    function getSnippet(sid) {
        //var obj =$cookies.get("access_token");
        return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/snippets/' + sid,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: { "Cookie": "obj" }
        })
    }

    function getSnippets() {
        //var obj =$cookies.get("access_token");
        return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/snippets',
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: { "Cookie": "obj" }
        })
    }

    function createSnippet(snippet) {
        //var obj =$cookies.get("access_token");
        return $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/snippets/',
            data: snippet,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        })

    }

    function compileSnippet(code) {
        var obj = $cookies.get("access_token");
        return $http({
            method: 'POST',
            url: 'http://www.koodet.com/6543/api/compile',
            code,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })

    }
}

 //-------------------------------
angular
    .module('myApp')
    .factory('userService', userService);

userService.$inject = ['$http', 'authService'];

function userService($http, authService) {
    var service = {
        getUser: geUser,
        createUser: createUser
    };

    return service;

    function getUser(uid) {
        return $http
            .get('http://www.koodet.com:6543/api/elements');
    }
}