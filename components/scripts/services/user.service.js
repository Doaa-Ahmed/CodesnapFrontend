angular
    .module('myApp')
    .factory('userService', userService);

userService.$inject = ['$http', 'authService'];

function userService($http, authService) {
    var service = {
        getUser: geUser,
        createUser: createUser
    };

    return service;

    function getUser(uid) {
        return $http
            .get('http://www.koodet.com:6543/api/elements');
    }
}