'use strict';

var app = angular.module('HelpersApp');

	app.controller('loginCtrl', function($scope, $state, loginService, range, updateInfo, getInfo, user) {
		$scope.loginAttempt = function(loginDetails) {
			var result = loginService.login(loginDetails);//Call loginService API
			if (result) {
				$scope.signedIn = true;
				$state.go('account.genInfo');
				$scope.account = user.login(result);//Both sets scope.account to result and saves result in user factory
			} else {
				$scope.failedLogin();
			}
		};

		$scope.failedLogin = function() {
			console.log('incorrect details');
		};

		$scope.logOut = function() {
			$scope.signedIn = false;
			$scope.account = null;
			$scope.loginPopup = false;
			$scope.save();
			$state.go('home');
		};

		$scope.updateInfo = function() {/*FIX THIS */
			var apikey =  'ApiKey ' + $scope.account.email + ':' + $scope.account.apikey;
			updateInfo.update($scope.account, apikey);
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

		$scope.load = function() {
			var loggedIn = user.loadUser();
			if (loggedIn) {
				$scope.account = loggedIn;
				$scope.signedIn = true;
			} else {
				$scope.signedIn = false;
				$scope.account = null;
			}
		};

		$scope.load();//Loads the login account from user factory
		$scope.range = range;//A range from a-b (generally days)
		$scope.loginPopup = false;
	});

