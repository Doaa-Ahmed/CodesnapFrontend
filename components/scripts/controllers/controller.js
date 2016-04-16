app.controller('PostController', ['$scope', '$http','$rootScope', function($scope, $http,$rootScope) {
		
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
		
	}]);

	app.controller('signupController', ['$scope', '$http', function($scope, $http) {
		
		this.signupForm = function() {
		var upobject = {'first_name':$scope.signupData.firstname,
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
			})
		}
		
	}]);	

	app.controller('addController', ['$scope', '$http', function($scope, $http) {
    	$http.get("http://www.koodet.com:6543/api/elements")
         .success(function(data) {
         	$scope.result=data;
         	console.log(data);
			console.log(status);
			$scope.lan = [];
			angular.forEach($scope.result.language, function(item) {
             $scope.lan.push(item);
            })
			$scope.con = [];
			angular.forEach($scope.result.context, function(item) {
             $scope.con.push(item);
            })
			$scope.typ = [];
			angular.forEach($scope.result.code_type, function(item) {
            $scope.typ.push(item);
            })
         
           })

         $scope.Postsnippet=function(){
        var snap = {'title': $scope.inputData.Title,
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
        


        }]);




app.controller('starCtrl', function($scope,$http) {
    $scope.rating = 0;
    $scope.rateFunction = function(rating) {
      var obj = {rating: rating};
 
         $http({

        method: 'POST',
        url: 'http://www.koodet.com:6543/api',
        data:JSON.stringify(obj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .success(function(data, status, headers, config) {
          console.log(data);
          console.log(status);
            })
      .error(function(data, status, headers, config) {
        console.log(data);
        console.log(status);


      })
    };


  });

app.directive('starRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index +1;
          scope.onRatingSelected({rating: index +1});
        };

        scope.$watch('ratingValue', function(newVal, oldVal) {
          if (newVal || newVal === 0) {
            updateStars();
          }
        });
      }
    }
  });


/*app.controller('expController', ['$scope', '$http','$routeParams', function($scope, $http,$routeParams) {
      var parameters = $routeParams.langId;
      var config = {
        params: parameters
      };

        $http.get("http://41.35.100.129:6543/api/explore/snippets/langId")
         .success(function(data) {
          $scope.result=data;
          console.log(data);
      console.log(status);
      $scope.tit = [];
      angular.forEach($scope.result.title, function(item) {
             $scope.tit.push(item);
            })
        })
      }]);
*/

app.controller('expController', ['$scope', '$http','$routeParams', function($scope, $http,$routeParams) {
  var snap = {
                    'language':$routeParams.lanid
            };

        $http({
        method: 'POST',

        url: 'http://41.35.118.106:6543/api/explore/snippets',
        data:JSON.stringify(snap),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           })
            .success(function(data, status, headers, config) {
          console.log(data);
          console.log(status);
          $scope.result=data;

          $scope.tit = [];
          angular.forEach($scope.result, function(item) {
             $scope.tit.push(item);
             console.log(item.title);
            }
            )
          

                    })
                }]);
