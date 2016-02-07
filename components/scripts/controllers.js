angular.module('myApp')

.controller('LogController',['$http','$scope','$location',function ($scope, $http, $location) {
    $scope.submit = function () {
    $http({
             method: 'POST',
             url: '/someUrl'
}).then(function successCallback(response) {
     $location.path('/login');
  }, function errorCallback(response) {
     $location.path('/index');

  });
}
    }]);
    
    .controller('SignController',  ['UserService', '$location', '$rootScope', 'FlashService',
    function(UserService, $location, $rootScope, FlashService) {

       $scope.signup=function() {
            $scope.dataLoading = true;
            UserService.Create($scope.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        $scope.dataLoading = false;
                    
                }
        }
    }
}

]);
