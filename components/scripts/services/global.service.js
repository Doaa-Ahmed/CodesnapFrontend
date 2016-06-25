angular
    .module('myApp')
    .factory('globalService', globalService);
   globalService.$inject = ['$http','$cookies', '$location', '$filter','authService'];

    function globalService($http, $cookies, $location, $filter,authService) {
    var service = {
        isAuth : isAuth,    
        setUser : setUser,
        getUser : getUser 
    };

    return service;
   globalService.user = null;

    function isAuth () {
        if (globalService.user == null) {
            globalService.user = $cookies.get('user');
        }
        return (globalService.user != null);
    }
    
    function setUser(newUser) {
        globalService.user = newUser;
        if (globalService.user == null) $cookies.remove('user');
        else $cookies.put('user', globalService.user);
    }
    function getUser() {
                return globalService.user;

    }

}