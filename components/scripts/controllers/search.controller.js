angular
    .module('myApp')
    .controller('searchController', searchController);

searchController.$inject = ['$scope','$cookies', '$http', '$location', 'optionsService', 'snippetService','authService'];


function searchController($scope,$cookies, $http, $location, optionsService, snippetService,authService) {


    $scope.searchSnippet=function(){
    var search = $scope.search;
    $location.path('/search/'+search);

    }}
