angular.module('myApp' ,['ngRoute' , 'ngCookies', 'ngResource'])
   
   .config(function($stateProvider,$routeProvider,$locationProvider) {
  
    $routeProvider
  .when('/index', {
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
    data: { requireLogin: true }
  }).
  when('/explore', {
    templateUrl: 'partials/explore.html',
    controller: 'ExploreController' ,
    data: { requireLogin: true }
  }).
  otherwise({
    redirectTo: '/login'
  })
});


