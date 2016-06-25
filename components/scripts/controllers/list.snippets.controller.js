/* controller registeration */
angular
	.module('myApp')
	.controller('listSnippetsController', listSnippetsController);

/* dependency injection */
listSnippetsController.$inject = ['$scope', '$http', '$routeParams', 'snippetService', 'questionService','authService'];

/* controller implementation */
function listSnippetsController($scope, $http, $routeParams, snippetService, questionService,authService) {

	$scope.fetchSnippets = fetchSnippets;
	$scope.fetchQuestions = fetchQuestions;
	$scope.snippets = [];
	$scope.questions = [];

	function fetchSnippets() {
		snippetService
			.getLangSnippets($routeParams.feature,$routeParams.fname)
			.success(function(data){
				$scope.snippets = data;
				console.log($scope.snippets)
			});
	}

	function fetchQuestions() {
		questionService
			.getLangQuestions($routeParams.feature,$routeParams.fname)
			.success(function(data) {
				console.log(data);
				$scope.questions = data;
				console.log($scope.questions)
			})
	}

}
