angular
    .module('myApp')
    .controller('LogoutController', LogoutController);

LogoutController.$inject = ['$http', '$scope', '$rootScope', '$location', 'authService', '$cookies'];

function LogoutController($http, $scope, $rootScope, $location, authService, $cookies) {
    $scope.logout = logout;

    function logout() {

        $rootScope.currentUserSignedIn = false;
        //$rootScope.userInfo = authService.getCookieData;
        //console.log(status);
        //console.log("hi");
        //$cookies.remove("auth");
        authService.clearCookieData();
        //console.log("hey");
        $location.path('/');
    }
}