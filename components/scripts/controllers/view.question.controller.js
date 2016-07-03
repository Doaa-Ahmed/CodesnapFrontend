angular
	.module('myApp')
	.controller('viewQuestionController', viewQuestionController);

function viewQuestionController($scope, $http, $routeParams, $cookies, $route, questionService,authService) {
	$scope.fetchQuestion = fetchQuestion;
	$scope.addAnswer = addAnswer;
	$scope.new_answer = {};
	$scope.question = {};
	$scope.question.answers = [];

	$scope.aceLoaded = function(_editor) {
    // Options
		_editor.setReadOnly(true);

        _editor.setVale(snippet.code);
        console.log(_editor);
    };

    $scope.compileSnippet=function(code){

        var snap = {
            'code': code

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
            $scope.new_answer.output = data.output;
            console.log(status);

        })
    }
	

	function fetchQuestion() {
		questionService
			.getQuestion($routeParams.qid)
			.success(function(data) {
				$scope.question = data;
			})
	}

	function addAnswer() {

		var answer = {
			"user_id": $cookies.get("user_id"),
			"description": $scope.new_answer.description,
			"code": $scope.new_answer.code,
			"question": $scope.question.question_id

		};

		$http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/answers',
            data: JSON.stringify(answer),
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
        
        })
        .success(function(data, status, headers, config) {
            $scope.new_answer = {};
            $route.reload();	
            console.log(status);

        })



	}

}