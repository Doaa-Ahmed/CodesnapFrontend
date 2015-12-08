var myApp=angular.module('myApp' ,[

        'ngRoute' ,
        'snippetControllers'

	]);

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
    redirectTo: '/'
  });
}]);
