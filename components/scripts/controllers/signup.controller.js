angular
    .module('myApp')
    .controller('signupController', signupController);

function signupController($scope, $http, $rootScope) {

    this.signupForm = function() {
        var upobject = {
            'first_name': $scope.signupData.firstname,
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
            data: JSON.stringify(upobject),
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })

        .success(function(data, status, headers, config) {
                //window.location.href = 'index.html';
                console.log(data);
                console.log(status);
                $scope.errorMsg = data.massage;
                if (data.massage == "success") {
                    $rootScope.correctsubmit = true;
                }

            })
            .error(function(data, status, headers, config) {
                //$scope.errorMsg = 'Unable to signup the form';
                console.log(data);
                console.log(status);
            })
    }
}