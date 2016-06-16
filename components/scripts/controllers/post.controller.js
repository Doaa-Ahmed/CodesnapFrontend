angular
  .module('myApp')
  .controller('PostController', PostController);
  PostController.$inject = ['$scope', '$http','$rootScope','$window'];


function PostController($scope, $http, $rootScope,$window) {
$scope.message = '';
    this.postForm = function() {


      
    var obj = {
            'username': $scope.inputData.username,
            'password': $scope.inputData.password
    };
    console.log(JSON.stringify(obj));

    $http({

      method: 'POST',
      url: 'http://www.koodet.com:6543/api/login',
      //withCredentials: true,  

      data:JSON.stringify(obj),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })

    .success(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      $rootScope.currentUserSignedIn = true;
      //Auth.setUser();
      $rootScope.username = data.username;
        })
    .error(function(data, status, headers, config) {
      $log.error("error handler message");
      console.log(data);
      console.log(status);
        });
    

    this.signupForm = function() {
        var upobject = {
                'first_name':$scope.signupData.firstname,
              'last_name': $scope.signupData.lastname,
            'username': $scope.signupData.username,
            'email': $scope.signupData.email,
            'password': $scope.signupData.password,
            'avatar': $scope.signupData.avatar,
            'country': $scope.signupData.country
            };

            console.log(JSON.stringify(upobject));


        $http({
          method: 'POST',
          url: 'http://www.koodet.com:6543/api/users',
          data:JSON.stringify(upobject),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
          //window.location.href = 'index.html';
          console.log(data);
          console.log(status);
            })
          
            .error(function(data, status, headers, config) {
          //$scope.errorMsg = 'Unable to signup the form';
          console.log(data);
          console.log(status);
        });
      }
    
  } 
}