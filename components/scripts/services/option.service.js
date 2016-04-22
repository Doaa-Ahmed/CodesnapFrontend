angular
	.module('myApp')
	.factory('option', option);

option.$inject = ['$http'];

function option() {
	return {
		getOptions: getOptions
	};

	function getOptions() {
		return $http.get('http://www.koodet.com:6543/api/options')
			.then(getOptionsComplete)
			.catch(getoptionsFailed)

		function getOptionsComplete(response) {
			return response.data;
		}

		function getOptionsFailed(error) {
			//logger.error("Failed"+ error.data);

		}

	}
}