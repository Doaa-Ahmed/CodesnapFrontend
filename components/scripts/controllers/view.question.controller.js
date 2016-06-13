angular
	.module('myApp')
	.controller('viewQuestionController', viewQuestionController);

function viewQuestionController($scope, $http, $routeParams, questionService) {
	$scope.fetchQuestion = fetchQuestion;
	$scope.question = {};
	

	function fetchQuestion() {
		questionService
			.getQuestion($routeParams.qid)
			.success(function(data) {
				$scope.question = data;
			})
	}

}