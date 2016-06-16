/* service registration */
angular
	.module('myApp')
	.factory('compileService', compileService);

/* dependency injection */
compileService.$inject = ['$http'];	

/* service implementation */
function compileService($http) {
	var service = {
		createCompile: createCompile		
	};

	return service;
	
	function createCompile(compile) { 
		return $http
		.post('http://www.koodet.com:6543/api/compile', compile);
	}	
}