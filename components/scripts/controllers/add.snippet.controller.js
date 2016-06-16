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
    // $scope.postSnippet = postSnippet;
    $scope.populateOptions = populateOptions;
    $scope.prepareSnippet = prepareSnippet;
    // $scope.compileSnippet = compileSnippet
    // $scope.snippet.code = $scope.snippet.code;

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

    // function compileSnippet() {
    //     snippetService.compileSnippet(JSON.stringify($scope.snippet.code)).success(function(data){
    //         console.log(data);
    //     })
    // }

    $scope.compileSnippet=function(){

        var snap = {
            'code': $scope.snippet.code
        };

        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/compile',
            data:JSON.stringify(snap),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            $scope.snippet.output = data.output;
            console.log(status);

        })
    }

    $scope.postSnippet=function(){
    var snap = {
            'title': $scope.snippet.title,
            'description': $scope.snippet.description,
            'code': $scope.snippet.code,
            'context': $scope.snippet.context.id,
            'tags': $scope.snippet.tags,
            'language': $scope.snippet.language.id,
            'code_type': $scope.snippet.code_type.id
    };

    $http({
        method: 'POST',
        url: 'http://www.koodet.com:6543/api/snippets',
        data:JSON.stringify(snap),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data, status, headers, config) {
        console.log($scope.snippet.output)
        console.log(status);

    })
    }

    // function postSnippet() {
    //     prepareSnippet();
    //     snippetService
    //         .createSnippet($scope.snippet)
    //         .success(function(data) {
    //             console.log(data);
    //         })
    // }
}