/* service registration */
angular
	.module('myApp')
	.factory('optionsService', optionsService);

/* dependency injection */
optionsService.$inject = ['$http'];

/* service implementation */
function optionsService($http) {
	var service = {
		getOptions : getOptions
	};

	return service;

	function getOptions() {
		return $http
		.get('http://www.koodet.com:6543/api/elements');
	}

}