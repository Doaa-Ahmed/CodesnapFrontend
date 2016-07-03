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