/* controller registeration */
angular
	.module('myApp')
	.controller('addQuestionController', addQuestionController);

/* dependency injection */
addQuestionController.$inject = ['$scope', '$http', '$location', 'optionsService', 'questionService','authService'];

/* controller implementation */
function addQuestionController($scope, $http, $location, optionsService, questionService,authService) {
    
    $scope.question = {};
    $scope.options = {};
    $scope.postQuestion = postQuestion;
    $scope.populateOptions = populateOptions;
    $scope.prepareQuestion = prepareQuestion;

    function populateOptions() {
        optionsService
            .getOptions()
            .success(function(data) {
                $scope.options = data;    
            });
    }

    function prepareQuestion() {
        $scope.question.language = $scope.question.language.id;
        $scope.question.context = $scope.question.context.id;
        $scope.question.code_type = $scope.question.code_type.id;   

    }

    function postQuestion() {
        prepareQuestion();
        var snap = JSON.stringify($scope.question);
        console.log(snap);
        var object = {
              'Cookie': authService.getCookieData
      };

        $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/questions',
            data: JSON.stringify($scope.question),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Cookie":JSON.stringify(object.access_token)
                
            },
            xhrFields: {
            withCredentials: true
        }
        })
        .success(function(data) {
            $location.path('/question/:qid');
            console.log(data);
        })
    }
}