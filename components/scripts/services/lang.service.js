/* service registration */
angular
	.module('myApp')
	.factory('langService', langService);

/* dependency injection */
langService.$inject = ['$http'];

/* service implementation */
function langService($http) {
	var service = {
		getLangs : getLangs,
		getLang : getLang
	};

	return service;

	function getLangs() {
		//get all languages
	}

	function getLang(langId) {
		//get a specific language
	}
}