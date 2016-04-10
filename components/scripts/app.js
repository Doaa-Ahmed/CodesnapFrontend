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
            })
            .when('/explore/language/:LangId', {
                templateUrl: 'pages/langsnippets.html',
                controller: 'expController'
      }).
        
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

