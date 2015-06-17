'use strict';

var app = angular.module('HelpersApp');

app.controller('signupCtrl', function($scope, $state, range, registerUserApi, after) {
	$scope.passValidate = true;
	$scope.emailValidate = true;
	$scope.bcValidate = true;

	$scope.checkValid = function(isValid) {
		return $scope.checkPass() && $scope.checkEmail() && $scope.bcEmail() && isValid;
	};

	$scope.checkPass = function() {
    if ($scope.confirm_password === $scope.newUser.password) {
      $scope.passValidate = true;
    } else {
      $scope.passValidate = false;
    }
		return $scope.passValidate;
	};

	$scope.checkEmail = function() {
    if ($scope.confirm_email === $scope.newUser.email) {
      $scope.emailValidate = true;
    } else {
      $scope.emailValidate = false;
    }
	return $scope.emailValidate;
	};

	$scope.bcEmail = function() {//Consider finding an alternative to eval
		$scope.bcValidate = eval(after('@', $scope.newUser.email) === 'bc.edu');// jshint ignore:line
		return true;//$scope.bcValidate;
	};

	$scope.register = function(newUser, isValid) {
		if ($scope.checkValid(isValid)) {
			var registered = registerUserApi.register(newUser);
      if (registered) {
        $state.go('account/genInfo');
      } else {
        console.log('did not signup'); //Update failed signup later
      }
		}
	};

	$scope.range = range;
});

/*Register user API can be found in factories/accountApi.js */
