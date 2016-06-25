angular
	.module('myApp')
	.factory('authService', authService);

authService.$inject = ['$cookies'];


function authService($cookies,$http,$location,$rootScope) {
		var service =  {
			setCookieData: setCookieData,
			//getCookieData: getCookieData,
			clearCookieData: clearCookieData,
			getaccess_token:getaccess_token
			//getAuthStatus:getAuthStatus
		};

		return service;

		function setCookieData(data) {

				//$cookies["user_id"] = data.user_id;
				//$cookies["user_name"]= data.username;
				//$cookies["access_token"]= data.token;
				//$cookies["currentUserSignedIn"] = true;
				$cookies.put("user_id",data.user_id);
				$cookies.put("user_name",data.username);
				$cookies.put("access_token",data.token);

		}


		function getaccess_token() {
			var access_token=$cookies.get("access_token");
				return access_token;
		}

		function getuser_id() {
			var user_id = $cookies.get("user_id");
			return user_id;
		}

		function getuser_name(){
			var user_name = $cookies.get("user_name");
			return user_name;
		}

		function clearCookieData() {
				$cookies.remove("user_id");
				$cookies.remove("user_name");
				$cookies.remove("access_token");
				$cookies.remove("currentUserSignedIn");

		}

	/* function getAuthStatus(){

	 	var status=$cookies.get('auth');
	 	if (status){
	 		return true;
	 	}else{
	 		return false;
	 	}
	 }*/

  }
