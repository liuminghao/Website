'use strict';

var app = angular.module('HelpersApp');

app.controller('signupCtrl', function($scope, range, registerUser, after, match) {
	$scope.passValidate = true;
	$scope.emailValidate = true;
	$scope.bcValidate = true;

	$scope.signupSubmit = function(isValid) {									/* test function */
		if ($scope.checkValid(isValid)) {
			console.log('hi');
		}
		else {
			console.log('no');
		}
	};

	$scope.checkValid = function(isValid) {
		return $scope.checkPass() && $scope.checkEmail() && $scope.bcEmail() && isValid;
	};

	$scope.checkPass = function() {
		$scope.passValidate = match($scope.confirmPassword, $scope.newUser.password);
		return $scope.passValidate;
	};

	$scope.checkEmail = function() {
		$scope.emailValidate = match($scope.confirmEmail, $scope.newUser.email);
		return $scope.emailValidate;
	};

	$scope.bcEmail = function() {//Consider finding an alternative to eval
		$scope.bcValidate = eval(after('@', $scope.newUser.email) === 'bc.edu');// jshint ignore:line
		return $scope.bcValidate;
	};

	$scope.register = function(newUser, isValid) {
		if ($scope.checkValid(isValid)) {
			registerUser.register($scope, newUser);
		}
	};

	$scope.range = range;
});

app.factory('registerUser', function($http) {
	return {
		register: function($scope, userInfo) {
			var $promise = $http({
				method: 'POST',
				url: 'http://54.172.140.235/api/v1/createuser/',
				headers: {'Content-Type': 'application/json'},
				data: JSON.stringify(userInfo)
			});

			$promise.success(function(result) {
				console.log('Congratulations on signing up!');
				console.log(result);
			});
		}
	};
});