/* controller registration */
angular
	.module('myApp')
	.controller('viewSnippetController', viewSnippetController);

/* dependency injection */
viewSnippetController.$inject = ['$scope', '$http', '$routeParams', 'snippetService'];	

/* controller implementation */
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