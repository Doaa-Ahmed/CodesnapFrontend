(function() {
	'use strict';

	var app = angular.module('myApp',['ngRoute' ,'ngCookies','ui.ace']);
	
	app.config(function ($httpProvider) {
		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
	});

})();