/* controller registeration */
angular
    .module('myApp')
    .controller('addSnippetController', addSnippetController);

/* dependency injection */
addSnippetController.$inject = ['$scope', '$http', '$location', 'optionsService', 'snippetService', 'compileService'];

/* controller implementation */
function addSnippetController($scope, $http, $location, optionsService, snippetService, complileService) {
    
    $scope.snippet = {};
    $scope.options = {};
    $scope.output = {};

    $scope.postSnippet = postSnippet;
    $scope.populateOptions = populateOptions;
    $scope.prepareSnippet = prepareSnippet;
    $scope.compileSnippet = compileSnippet;

    
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
        var snap = JSON.stringify($scope.snippet);
        console.log(snap);

        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/snippets',
            data: JSON.stringify($scope.snippet),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                
            }
        })
        .success(function(data) {
            console.log(data)
        })
    }

    function compileSnippet() {
        var compile = {
            code : $scope.snippet.code
        };

        compileService
            .createSnippet(JSON.stringify(compile))
            .success(function(data) {
                $scope.output = data;
            })
    }

}