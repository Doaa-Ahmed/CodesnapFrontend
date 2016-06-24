angular
	.module('myApp')
	.config(configurator)
function configurator($routeProvider,$httpProvider) {

	$routeProvider
        .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'PostController',
                
        })
        .when('/register', {
                templateUrl : 'pages/Signup.html',
                controller  : 'signupController',
                
        })
       .when('/profile', {
             templateUrl : 'pages/userprofile.html',
             controller  : 'profileController',
                
        })
        
        .when('/search', {
                templateUrl : 'pages/search.html',
                controller  : 'searchController',
                
        })
        .when('/explore', {
        		templateUrl : 'pages/list.langs.html',
                controller : 'listLangsController',
                //authenticated:true
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
        .when('/add', {
                templateUrl : 'pages/add.snippet.html',
                controller  : 'addSnippetController',
                //authenticated:true
        })
        .when('/request', {

                templateUrl : 'pages/request.html',
                controller  : 'requestController',
                //authenticated:true
        })
        .otherwise({
        		redirectTo: 'pages/home.html'
        });

}	


  /*myApp.run(["$rootScope", "$location", 'authService', 
     function ($rootScope, $location, authService) {
    $rootScope.$on("$routeChangeStart"
    , function (event ,next , current) {

        if (next.$$route.authenticated) {
            if(!authService.getAuthStatus()){
            $location.path('/');
            }
        }
        
    });
}]);

*/