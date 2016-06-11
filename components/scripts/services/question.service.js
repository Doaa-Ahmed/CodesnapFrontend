/* service registration */
angular
	.module('myApp')
	.factory('questionService', questionService);

/* dependency injection */
questionService.$inject = ['$http']; 	

/* service implementation */
function questionService($http) {
	
	var service = {
		getLangQuestions : getLangQuestions,	
		getQuestion : getQuestion,
		createQuestion : createQuestion	
	};

	return service;
	
	function getLangQuestions(langId) {
		return $http
		.get('http://www.koodet.com:6543/api/explore/' + langId + '/questions');
	}

	function getQuestion(qid) {
		return $http
		.get('http://www.koodet.com:6543/api/questions/' + qid);
	}

	function createQuestion(question) {
		return $http
		.post('http://www.koodet.com:6543/api/questions/', question)
	}
}