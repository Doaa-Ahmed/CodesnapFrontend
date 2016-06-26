angular
	.module('myApp')
	.controller('viewSnippetController', viewSnippetController);

function viewSnippetController($scope, $http, $routeParams, $location, $route, $cookies, snippetService,authService) {

	$scope.fetchSnippet = fetchSnippet;
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