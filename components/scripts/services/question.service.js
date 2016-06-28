angular
	.module('myApp')
	.factory('questionService', questionService);

function questionService($http,authService) {
	    var object = authService.getCookieData;

	var service = {
		getLangQuestions : getLangQuestions,	
		getQuestion : getQuestion,
		createQuestion : createQuestion	
	};

	return service;
	

	function getLangQuestions(feature,fname) {
		return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/explore/'+feature+'/'+ fname + '/questions',
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                
         })
	}

	function getQuestion(qid) {
		return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/questions/' + qid,
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                
         })
		
	}

	function createQuestion(question) {
		return $http
		.post('http://www.koodet.com:6543/api/questions/', question)
	}
}