angular
	.module('myApp')
	.factory('authService', authService);

authService.$inject = ['$cookies'];


function authService($cookies,$http,$location,$rootScope) {
		var service =  {
			setCookieData: setCookieData,
			getCookieData: getCookieData,
			clearCookieData: clearCookieData
		};

		return service;

		function setCookieData(data) {

				$cookies["user_id"] = data.user_id;
				$cookies["user_name"]= data.username;
				$cookies["access_token"]= data.token;
				$cookies["currentUserSignedIn"] = true;

		}


		function getCookieData() {
				//$cookies.getAll();
				return $cookies;
		}

		function clearCookieData() {
			delete $cookies["user_id"];
			delete $cookies["user_name"];
			delete $cookies["access_token"];
			delete $cookies["currentUserSignedIn"];

				//$cookies.remove("user_id");
				//$cookies.remove("user_name");
				//$cookies.remove("access_token");
				//$cookies.remove("currentUserSignedIn");

		}

  }
