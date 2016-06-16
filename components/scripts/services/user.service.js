/* service registration */
angular
	.module('myApp')
	.factory('userService', userService);

/* dependency injection */
userService.$inject = ['$http'];

/* service implementation */
function userService($http) {
	var service = {
		getUser : geUser,
		createUser : createUser
	};

	return service;

	function getUser(uid) {
		return $http
		.get('http://www.koodet.com:6543/api/elements');
	}

}