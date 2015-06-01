'use strict';

var app = angular.module('HelpersApp');

	app.controller('loginCtrl', function($scope, $localStorage, $location, $state, 
				loginService, range, match, after, updateInfo, getInfo) {

		$scope.logUserIn = function(result) {
			$scope.signedIn = true;
			$scope.account = result;
			$scope.save();
			$location.path('account');
		};

		$scope.failedLogin = function() {
			console.log('incorrect details');
		};

		$scope.loginAttempt = function(loginDetails) {
			loginService.login(loginDetails, $scope);//Call loginService API
		};

		$scope.logOut = function() {
			$scope.signedIn = false;
			$scope.account = null;
			$scope.loginPopup = false;
			$scope.save();
			$location.path('home');
		};

		$scope.updateInfo = function() {/*FIX THIS */
			var apikey =  'ApiKey ' + $scope.account.email + ':' + $scope.account.apikey;
			updateInfo.update($scope, apikey);
			console.log($scope.account);
		};

		$scope.printInfo = function() {
			var apikey =  'ApiKey ' + $scope.account.email + ':' + $scope.account.apikey;
			getInfo.print($scope, apikey);
		};

		$scope.toggleLogin = function() {
			$scope.loginPopup = !$scope.loginPopup;
		};

		$scope.showLogin = function() {
			if ($scope.loginPopup && !$scope.signedIn) {
				return true;
			}/* User is not logged in and they have clicked the login button */
			else {
				return false;
			}
		};

		$scope.save = function() {
			$scope.storage.account = $scope.account;
		};

		$scope.load = function() {
			if (typeof $scope.storage.account === 'undefined' || $scope.storage.account === null) {
				$scope.account = null;
				$scope.signedIn = false;
			}
			else {
				$scope.account = $scope.storage.account;
				$scope.signedIn = true;
			}
		};

		$scope.checkPage = function(page) {
			if (match(page, after('.', $state.current.name))) {
				return true;
			} else {
				return false;
			}
		};//Checks if the current page matches the inputted page. Consider updating this in the future to make it more natural?

		$scope.storage = $localStorage;//GET RID OF SAVE AND LOAD 
		$scope.load();//Loads the login account from cookies
		$scope.range = range;//A range from a-b (generally days)
		$scope.loginPopup = false;
	});

	app.factory('loginService', function($http) {
		return {
			login: function(user, $scope) {
				var $promise = $http({
	      	method: 'POST',
	      	url: 'http://54.172.140.235/api/v1/user/login/',
	      	headers: {'Content-Type': 'application/json'},
	      	data: JSON.stringify(user)
	      });

	      $promise.success(function(result) {//The user logged in successfully
	      	$scope.logUserIn(result);
	      }).error(function() {//The user's credentials were invalid
	      	$scope.failedLogin();
	      });
			}
		};
	});

	app.factory('updateInfo', function($http) {
		return {
			update: function($scope, apikey) {
				var $promise = $http({
					method: 'PUT',
					url: 'http://54.172.140.235/api/v1/user/3/',
					headers: {
						'Content-Type': 'application/json',
						'AUTHORIZATION': apikey
					},
					data: $scope.account
				});

				$promise.success(function() {
					console.log('Updated information');
					console.log('UPDATE THIS FUNCTION!');
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

