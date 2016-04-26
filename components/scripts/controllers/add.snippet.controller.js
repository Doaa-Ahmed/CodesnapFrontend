/* controller registeration */
angular
	.module('myApp')
	.controller('addSnippetController', addSnippetController);

/* dependency injection */
addSnippetController.$inject = ['$scope', '$http', '$location', 'optionsService', 'snippetService'];

/* controller implementation */
function addSnippetController($scope, $http, $location, optionsService, snippetService) {
    
    $scope.snippet = {};
    $scope.options = {};
    $scope.postSnippet = postSnippet;
    $scope.populateOptions = populateOptions;
    $scope.prepareSnippet = prepareSnippet;

    function populateOptions() {
        optionsService
            .getOptions()
            .success(function(data) {
                $scope.options = data;    
            });
    }

    function prepareSnippet() {
        $scope.snippet.language = $scope.snippet.language.id;
        $scope.snippet.context = $scope.snippet.context.id;
        $scope.snippet.code_type = $scope.snippet.code_type.id;   

    }

    function postSnippet() {
        prepareSnippet();
        snippetService
            .createSnippet($scope.snippet)
            .success(function(data) {
                console.log(data);
            })
    }
}