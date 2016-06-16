var app = angular.module('myApp',[
	'ngRoute'
  ]);


app.config(function ($httpProvider) {
	withCredentials: true,
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  
});	

