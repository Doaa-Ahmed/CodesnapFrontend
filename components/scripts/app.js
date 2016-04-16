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
            .when('/language/:lanid', {
                templateUrl: 'pages/langsnippets.html',
                controller: 'expController'


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

             .otherwise({redirectTo: 'pages/Signin.html'
         });
    });

/*run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/Signin', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/Signin');
            }
            */
