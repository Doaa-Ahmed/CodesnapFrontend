angular
	.module('myApp')
	.controller('viewSnippetController', viewSnippetController);

function viewSnippetController($scope, $http, $routeParams, $location, $route, $cookies, snippetService,authService) {

	$scope.fetchSnippet = fetchSnippet;
    $scope.getRelated = getRelated;
	$scope.addComment = addComment;
	$scope.snippet = {};
	$scope.new_comment = "";
	$scope.snippet.comments = [];

	function fetchSnippet() {
		snippetService
			.getSnippet($routeParams.sid)
			.success(function(data) {
				$scope.snippet = data;
			});
	}

    function getRelated() {
        snippetService
            .getSnippets()
            .success(function(data) {
                $scope.related = data;
                console.log(data);
            });
    }

	$scope.aceLoaded = function(_editor) {
    // Options
		_editor.setReadOnly(true);

        _editor.setVale(snippet.code);
        console.log(_editor);
    };

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
    };

    function addComment() {

        var comment = {

            "user_id": $cookies.get("user_id"),
            "description": $scope.new_comment,
            "snippet": $scope.snippet.snippet_id
        };

        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/comments',
            data: JSON.stringify(comment),
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
        
        })
        .success(function(data, status, headers, config) {
            $scope.new_comment = "";
            $route.reload();    
            console.log(status);

        })
    }
}