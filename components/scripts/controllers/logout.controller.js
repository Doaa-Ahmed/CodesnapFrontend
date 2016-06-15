angular
	.module('myApp')
	.controller('LogoutController', LogoutController);
LogoutController.$inject = ['$scope','$rootScope','$window'];

function LogoutController($scope,$rootScope, $location, $route) {
$scope.logout = function () {
	             //$route.reload();
                //localStorage.clearAll();
                //$location.path('/home');
                 $rootScope.currentUserLogedout = true;
            }
        }