'use strict';

var app = angular.module('HelpersApp');

	app.factory('loginService', function($http) {
		return {
			login: function(user) {
				var $promise = $http({
	      	method: 'POST',
	      	url: 'http://54.172.140.235/api/v1/user/login/',
	      	headers: {'Content-Type': 'application/json'},
	      	data: JSON.stringify(user)
	      });

	      $promise.success(function(result) {//The user logged in successfully
	      	return result;
	      }).error(function() {//The user's credentials were invalid
	      	return false;
	      });
			}
		};
	});
	
	app.factory('updateInfo', function($http) {
		return {
			update: function(account, apikey) {
				var $promise = $http({
					method: 'PUT',
					url: 'http://54.172.140.235/api/v1/user/3/',
					headers: {
						'Content-Type': 'application/json',
						'AUTHORIZATION': apikey
					},
					data: account
				});

				$promise.success(function(result) {
					console.log('UPDATE THIS FUNCTION!');
					return result;
				}).error(function() {
					console.log('YOU FAILED');
				});
			}
		};
	});

	app.factory('getInfo', function($http) {
		return {
			print: function($scope, apikey) {
				var $promise = $http({
					method: 'GET',
					url: 'http://54.172.140.235/api/v1/user/3/',
					headers: {
						'Content-Type': 'application/json',
						'AUTHORIZATION': apikey
					}
				});

				$promise.success(function(result) {
					console.log(result);
				}).error(function() {
					console.log('FAILED INFO REQUEST');
				});
			}
		};
	});

	app.factory('forgotPassword', function($http) {
		return {
			forgot: function($scope) {
				var $promise = $http({
					method: 'POST',
					url: 'http://54.172.140.235/api/v1/user/password/reset/',
					headers: {
						'Content-Type': 'application/json'
					},
					data: $scope.account.email
				});

				$promise.success(function() {
					console.log('Your password has been reset, check your email');
				}).error(function() {
					console.log('You entered a non existent email');
				});
			}
		};
	});

	app.factory('validation', function($http) {
		return {
			validate: function(email, digit) {
				var $promise = $http({
					method: 'POST',
					url: 'http://54.172.140.235/api/v1/user/digit/',
					headers: {
						'Content-Type': 'application/json',
					},
					data: {'email': email, 'digit': digit }
				});

				$promise.success(function() {
					console.log('You have vertified your account');
				}).error(function(result) {
					if (result.status === 'The email already verified') {
						console.log('You have already been vertified');
					} else if (result.status  === 'Digit expired') {
						console.log('Sorry this digit has expired, another email has been sent to your account');
					} else if (result.status  === 'Invalid digit') {
						console.log('Sorry you entered an incorrect digit');
					} else if (result.status  === 'Invalid digit format, the digit should be a 4 digit number') {
						console.log('Please enter a 4 digit number');
					} else {
						console.log('I m afraid I m not sure what went wrong');
					}
				});
			}
		};
	});