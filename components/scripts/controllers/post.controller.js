angular
  .module('myApp')
  .controller('PostController', PostController);


PostController.$inject = ['$scope', '$http','$rootScope','$window','authService'];


function PostController($scope, $http, $rootScope,$window,authService) {

    this.postForm = postForm;

      function postForm() { 

      var obj = {
              'username': $scope.inputData.username,
              'password': $scope.inputData.password
      };

      console.log(JSON.stringify(obj));

      $http({

        method: 'POST',
        url: 'http://www.koodet.com:6543/api/login',

        data:JSON.stringify(obj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })

      .success(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
        $rootScope.userInfo = authService.getCookieData();
        $rootScope.username = data.username;
        console.log("hi");
        authService.setCookieData(data);
        console.log("hey");
      })
      .error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);
      });
  } 
}