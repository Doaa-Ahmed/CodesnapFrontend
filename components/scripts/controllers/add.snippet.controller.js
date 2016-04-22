angular
	.module('myApp')
	.controller('addSnippetController', addSnippetController);


function addSnippetController($scope, $http) {

	$http.get("http://www.koodet.com:6543/api/elements")
        .success(function(data) {
         	$scope.result=data;
         	console.log(data);
			console.log(status);
			$scope.lan = [];
			angular.forEach($scope.result.language, function(item) {
                $scope.lan.push(item);
            });

		    $scope.con = [];
			angular.forEach($scope.result.context, function(item) {
                $scope.con.push(item);
            });

			$scope.typ = [];
			angular.forEach($scope.result.code_type, function(item) {
                $scope.typ.push(item);
            });
         
        });

        $scope.Postsnippet=function(){
            var snap = {
                'title': $scope.inputData.Title,
                'description': $scope.inputData.Description,
                'code': $scope.inputData.Code,
                'context': $scope.inputData.Context.id,
                'tags': $scope.inputData.Tags,
                'language': $scope.inputData.Language.id,
                'code_type': $scope.inputData.Codetype.id,
            };

            $http({
                method: 'POST',
                url: 'http://www.koodet.com:6543/api/snippets',
                data:JSON.stringify(snap),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })

            .success(function(data, status, headers, config) {
                console.log(data);
                console.log(status);

            })
        }   
}