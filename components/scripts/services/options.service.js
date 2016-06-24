/* service registration */
angular
	.module('myApp')
	.factory('optionsService', optionsService);

/* dependency injection */
optionsService.$inject = ['$http','authService','$cookies'];

/* service implementation */
function optionsService($http,authService,$cookies) {
		//var object =authService.getaccess_token();
	var service = {
		getOptions : getOptions
	};

	return service;
   // var obj =$cookies.get("access_token");
	function getOptions() {
		return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/elements',
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                
         })
	}

}