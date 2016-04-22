angular
	.module('myApp')
	.controller('listSnippetsController', listSnippetsController);

function listSnippetsController($scope, $http) {

	$scope.fetchSnippets = fetchSnippets;
	$scope.snippets = [];
	
	function fetchSnippets(langId) {
		$http.get('http://www.koodet.com:6543/api/explore/' + langId + '/snippets')
		.success(function(data) {
			$scope.snippets = data;

		})	
	}
	
}