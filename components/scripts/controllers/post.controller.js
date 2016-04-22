angular
  .module('myApp')
  .controller('PostController', PostController);

function PostController($scope, $http, $rootScope) {
  this.postForm = function() {
      
    var obj = {'username': $scope.inputData.username,'password': $scope.inputData.password};
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
          $rootScope.currentUserSignedIn = true;
      //  $rootScope.currentUser.username = data.username;
            })
      .error(function(data, status, headers, config) {
        //$scope.errorMsg = 'Unable to submit form';
        console.log(data);
        console.log(status);

      })
    }

}