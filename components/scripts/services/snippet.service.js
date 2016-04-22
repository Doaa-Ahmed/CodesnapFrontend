angular
	.module('myApp')
	.factory('Snippet', Snippet);

function Snippet($http) {
	var Snippet = {};

	Snippet.getLangSnippets = function(langId) {
		return $http.get('http://www.koodet.com:6543/api/explore/' + langId + '/snippets').success(function(response) {
			return response.data;
		})
	}
}