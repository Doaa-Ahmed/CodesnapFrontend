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