angular
	.module('myApp')
	.controller('viewSnippetController', viewSnippetController);

function viewSnippetController($scope, $http, $routeParams, snippetService) {
	$scope.fetchSnippet = fetchSnippet;
	$scope.snippet = {};

	function fetchSnippet() {
		snippetService
			.getSnippet($routeParams.sid)
			.success(function(data) {
				$scope.snippet = data;
			});
	}
}