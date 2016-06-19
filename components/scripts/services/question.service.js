angular
	.module('myApp')
	.factory('questionService', questionService);

function questionService($http) {
	var service = {
		getLangQuestions : getLangQuestions,	
		getQuestion : getQuestion,
		createQuestion : createQuestion	
	};

	return service;
	
	function getLangQuestions(feature,fname) {
		return $http
		.get('http://www.koodet.com:6543/api/explore/'+feature+'/'+ fname + '/questions');
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