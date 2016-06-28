/* controller registeration */
angular
    .module('myApp')
    .controller('addSnippetController', addSnippetController);

/* dependency injection */
addSnippetController.$inject = ['$scope','$cookies', '$http', '$location', 'optionsService', 'snippetService','authService'];

/* controller implementation */
function addSnippetController($scope,$cookies, $http, $location, optionsService, snippetService,authService) {

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


    //snippet editor functions
    $scope.compileSnippet=function(){

        var snap = {
            'code': $scope.snippet.code

        };
        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/compile',
            data:JSON.stringify(snap),
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
        
        })
        .success(function(data, status, headers, config) {
            $scope.snippet.output = data.output;
            console.log(status);

        })
    }

    $scope.aceLoaded = function(_editor) {
    // Options
    console.log(_editor);
        var _session = _editor.getSession();
        var _renderer = _editor.renderer;

        _editor.setValue("Add Your Code HERE!",1);
        _session.setMode("ace/mode/javascript");

        var code = _editor.getValue();
        console.log(code);

        // _editor.setReadOnly(true);
    };

    $scope.aceChanged = function(e) {
        snippet.code= _editor.getValue();
        console.log(e)
    //
    };

    $scope.postSnippet=function(){
    var snap = {
            'user_id':1, 
            'title': $scope.snippet.title,
            'description': $scope.snippet.description,
            'code': $scope.snippet.code,
            'context': $scope.snippet.context.id,
            'tags': $scope.snippet.tags,
            'language': $scope.snippet.language.id,
            'code_type': $scope.snippet.code_type.id,
            'user_id':$cookies.get("user_id")
    };

    $http({
        method: 'POST',
        url: 'http://www.koodet.com:6543/api/snippets',
        data:JSON.stringify(snap),
        crossDomain: true, 
        xhrFields: { withCredentials: true},
        headers: {'Content-Type': 'application/x-www-form-urlencoded' }
       })
    .success(function(data, status, headers, config) {
        console.log($scope.snippet.output);
        console.log(status);
        $location.path('/snippet/'+ data.snippet_id);

    })
    }

}