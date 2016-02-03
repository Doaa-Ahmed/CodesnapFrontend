var myApp=angular.module('myApp' ,['ngRoute' , 'ngCookies', 'snippetControllers']);

myApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  $routeProvider.
  when('/index', {
    templateUrl: 'index.html',
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LogController',
}).
  when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignController'
  }).
  
  when('/search', {
    templateUrl: 'partials/search.html',
    controller: 'SearchController'
  }).
  when('/add', {
    templateUrl: 'partials/add.html',
    controller: 'AddController',
    resolve: { loggedin: checkLoggedin }
  }).
  when('/explore', {
    templateUrl: 'partials/explore.html',
    controller: 'ExploreController' ,
    resolve: { loggedin: checkLoggedin }
  }).
  otherwise({
    redirectTo: '/login'
  });
}
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
]);
