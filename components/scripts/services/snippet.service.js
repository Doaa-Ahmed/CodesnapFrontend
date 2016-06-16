/* service registration */
angular
	.module('myApp')
	.factory('snippetService', snippetService);

/* dependency injection */
snippetService.$inject = ['$http'];	

/* service implementation */
function snippetService($http) {
	var service = {
		getLangSnippets : getLangSnippets,
		getSnippet : getSnippet,
		createSnippet : createSnippet
	};

	return service;
	
	function getLangSnippets(langId) {
		return $http
		.get('http://www.koodet.com:6543/api/explore/' + langId + '/snippets');
			
	}

	function getSnippet(sid) {
		return $http
		.get('http://koodet.com:6543/api/snippets/' + sid);
	}

	function createSnippet(snippet) { 

	}	
}