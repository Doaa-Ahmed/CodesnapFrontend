angular
	.module('myApp')
	.controller('LogoutController', LogoutController);
LogoutController.$inject = ['$scope','$rootScope','$window','authService'];

function LogoutController($scope,$rootScope, $location, $route,authService) {
	$scope.logout = logout;
function logout() {
	           
                authService.clearCookieData();

                 $rootScope.currentUserSignedIn = authService.getCookieData["currentUserSignedIn"];

            }
        }