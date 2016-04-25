/* controller registeration */
angular
	.module('myApp')
	.controller('listSnippetsController', listSnippetsController);

/* dependency injection */
listSnippetsController.$inject = ['$scope', '$http', '$routeParams', 'snippetService', 'questionService'];

/* controller implementation */
function listSnippetsController($scope, $http, $routeParams, snippetService, questionService) {

	$scope.fetchSnippets = fetchSnippets;
	$scope.fetchQuestions = fetchQuestions;
	$scope.snippets = [];
	$scope.questions = [];
	
	function fetchSnippets() {
		snippetService
			.getLangSnippets($routeParams.lanid)
			.success(function(data){
				$scope.snippets = data;
			});
	}

	function fetchQuestions() {
		questionService
			.getLangQuestions($routeParams.lanid)
			.success(function(data) {
				$scope.questions = data;
				console.log($scope.questions)
			})
	}
	
}


