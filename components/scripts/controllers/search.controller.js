angular
    .module('myApp')
    .controller('searchController', searchController);

function searchController($scope, $rootScope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    }
}