angular
	.module('myApp')
	.factory('snippetService', snippetService);

function snippetService($http) {
	var service = {
		getLangSnippets : getLangSnippets,
		getSnippet : getSnippet,
		createSnippet : createSnippet
	};

	return service;
	
	function getLangSnippets(feature,fname) {
		return $http
		.get('http://www.koodet.com:6543/api/explore/' +feature+'/'+ fname + '/snippets');
			
	}

	function getSnippet(sid) {
		return $http
		.get('http://www.koodet.com:6543/api/snippets/' + sid);
	}

	function createSnippet(snippet) {
		return $http
		.post('http://www.koodet.com:6543/api/snippets/', snippet);
	}	

	function compileSnippet(code) {
		return $http.post('http://www.koodet.com/6543/api/compile', code)
	}
}