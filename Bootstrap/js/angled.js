'use strict';

	var app = angular.module('HelpersApp', ['ngStorage']);

	app.controller("loginCtrl", function($scope, $localStorage, loginService, updateInfo) {
		$scope.logUserIn = function(result) {
			$scope.signedIn = true;
			$scope.account = result;
			$scope.save();
		}

		$scope.failedLogin = function() {
			$scope.failed = true;
		}

		$scope.loginAttempt = function(info) {
			loginService.login(info, $scope);//Call loginService			
		}

		$scope.save = function() {
			$localStorage.account = $scope.account;
		}

		$scope.load = function() {
			if (typeof $localStorage.account === 'undefined' || $localStorage.account === null) {
				$scope.account = null;
				$scope.signedIn = false;
			}
			else {
				$scope.account = $localStorage.account;
				$scope.signedIn = true;
			}
		}

		$scope.userInfo = function() {
			console.log($scope.account);
		}

		$scope.logOut = function() {
			$scope.signedIn = false;
			$scope.failed = false; 
			$scope.account = null;
			$scope.save();
		}

		$scope.updateInfo = function() {
			var apiKey = 'ApiKey ' + $scope.account.username + ":" + $scope.account.apikey;
			updateInfo.update($scope, apiKey);
		}

		$scope.failedLogin = false; 
		$scope.load();

	});

	app.controller('signupCtrl', function($scope, range, registerUser) {
		$scope.signupSubmit = function(isValid) {
			if ($scope.checkValid(isValid)) {
				console.log('hi');
			}
		}

		$scope.checkValid = function(isValid) {
			var passMatch = $scope.match($scope.confirmPassword, $scope.newUser.password);
			var emailMatch = $scope.match($scope.confirmEmail, $scope.newUser.email);

			return isValid && passMatch && emailMatch;
		} 

		$scope.match = function(itemA, itemB) {
			if (itemA === itemB) {
				return true;
			}
			else {
				return false;
			}
		}

		$scope.register = function(newUser, isValid) {
			if ($scope.checkValid(isValid)) {
				registerUser.register($scope, newUser);
			}
		}

		$scope.range = range;
		$scope.test = "a";
	});

	app.factory('range', function() {
		return function(start, end) {
			var range = [];
			for (var i=end; i >= start; i--) {
				range.push(i);
			}
			return range;
		}
	});

	app.factory('loginService', function($http) {
		return {
			login: function(user, $scope) {
				var $promise = $http({
	      	method: "POST",
	      	url: "http://54.172.140.235/api/v1/user/login/",
	      	headers: {'Content-Type': "application/json"},
	      	data: JSON.stringify(user)
	      });

	      $promise.success(function(result) {//The user logged in successfully
	      	$scope.logUserIn(result);
	      }).error(function() {//The user's credentials were invalid
	      	$scope.failedLogin();
	      });
			}
		}
	});

	app.factory('updateInfo', function($http) {
		return {
			update: function($scope, apiKey) {
				var $promise = $http({
					method: "PUT",
					url: "http://54.172.140.235/api/v1/user/3/",
					headers: {'Content-Type': "application/json"},
					AUTHORIZATION: apiKey,
					data: $scope.account
				});

				$promise.success(function(result) {
					console.log("Updated information");
				})
			}
		}
	});

	app.factory('registerUser', function($http) {
		return {
			register: function($scope, userInfo) {
				var $promise = $http({
					method: "POST",
					url: "http://54.172.140.235/api/v1/createuser/",
					headers: {'Content-Type': "application/json"},
					data: JSON.stringify(userInfo)
				});

				$promise.success(function(result) {
					console.log("User signed up");
				})
			}
		}
	});

