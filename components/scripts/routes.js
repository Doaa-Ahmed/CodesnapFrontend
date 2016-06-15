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
        		templateUrl : 'pages/list.langs.html',
                controller : 'listLangsController'
        })
        .when('/language/:lanid', {
                templateUrl: 'pages/langsnippets.html',
                controller: 'listSnippetsController'
        })
        .when('/snippet/:sid', {
                templateUrl: 'pages/view.snippet.html',
                controller: 'viewSnippetController'
        })
        .when('/question/:qid', {
                templateUrl: 'pages/view.question.html',
                controller: 'viewQuestionController'
        })
        // route for the about page
        .when('/add', {
                templateUrl : 'pages/add.snippet.html',
                controller  : 'addSnippetController'
        })
        // route for the contact page
        .when('/request', {
                templateUrl : 'pages/add.question.html',
                controller  : 'addQuestionController'
        })
        .otherwise({
        		redirectTo: 'pages/Signin.html'
        });
}	