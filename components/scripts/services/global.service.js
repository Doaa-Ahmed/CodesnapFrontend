angular
    .module('myApp')
    .factory('globalService', globalService);
   globalService.$inject = ['$http','$cookieStore', '$location', '$filter'];

    function globalService($http, $cookieStore, $location, $filter) {
    var service = {
        isAuth : isAuth,    
        setUser : setUser,
        getUser : getUser 
    };

    return service;
   globalService.user = null;

    function isAuth () {
        if (globalService.user == null) {
            globalService.user = $cookieStore.get('user');
        }
        return (globalService.user != null);
    }
    
    function setUser(newUser) {
        globalService.user = newUser;
        if (globalService.user == null) $cookieStore.remove('user');
        else $cookieStore.put('user', globalService.user);
    }
    function getUser() {
                return globalService.user;

    }

}