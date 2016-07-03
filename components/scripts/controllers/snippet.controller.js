angular
    .module('myApp')
    .controller('snippetController', snippetController);

function snippetController($scope, $http) {

    $scope.Postsnippet = function() {
        var snap = {
            'title': $scope.inputData.Title,
            'description': $scope.inputData.Description,
            'code': $scope.inputData.Code,
            'context': $scope.inputData.Context.id,
            'tags': $scope.inputData.Tags,
            'language': $scope.inputData.Language.id,
            'code_type': $scope.inputData.Codetype.id,
        };
        var object = {
            'Cookie': authService.getCookieData()
        };

        $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/snippets',
                data: JSON.stringify(snap),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Cookie": JSON.stringify(object.access_token)
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .success(function(data, status, headers, config) {
                console.log(data);
                console.log(status);

            })
    }
}