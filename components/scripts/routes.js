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

