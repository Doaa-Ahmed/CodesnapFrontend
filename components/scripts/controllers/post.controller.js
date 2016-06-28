angular
  .module('myApp')
  .controller('PostController', PostController);

PostController.$inject = ['$scope', '$http','$rootScope','authService','$cookies'];

function PostController($scope, $http, $rootScope,authService,$cookies) {
  this.postForm = function() {
      var obj = {
              'username': $scope.inputData.username,
              'password': $scope.inputData.password
      };

      console.log(JSON.stringify(obj));

      $http({
        method: 'POST',
        url: 'http://www.koodet.com:6543/api/login',
        data:JSON.stringify(obj),
        xhrFields: {withCredentials: true},
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}

      })
        .success(function(data, status, headers, config) {

        console.log(data);
        console.log(status);
        $rootScope.currentUserSignedIn =true;

        authService.setCookieData(data);
        $rootScope.username = data.username;
        
      })
      .error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
      });
  } 
}