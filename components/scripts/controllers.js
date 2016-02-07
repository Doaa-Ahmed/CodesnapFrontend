angular.module('myApp',[])
.controller('LogController',['$http','$scope','$location',function ($scope, $http, $location) {
    $scope.submit = function () {
        var encodedString = 'username='+ encodeURIComponent($scope.user.username) + '&password='+encodeURIComponent($scope.user.password);
    $http({
             method: 'POST',
             url: '/someUrl',
             data:encodedString
}).then(function successCallback(response) {
     console.log(data);
     $location.path('/login');
  }, function errorCallback(response) {
            console.log("unable to submit data");
        $scope.errorMsg ="login not correct";
  })
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
