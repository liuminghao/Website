'use strict';

var app = angular.module('HelpersApp');

app.controller('preSignup', function($scope, $location, $http, after) {
		
		$scope.bcEmail = function() {
			if (after('@', $scope.newUser.email) === 'bc.edu') {
				$location.path('signup');
			}
			else {
				$scope.notAvailable = true;
			}
		};

		$scope.submitPreForm = function(subscribe) {
			if (subscribe) {
				var $promise = $http({
					url: 'php/store-address.php',
					data: 'ajax=true&email=' +  escape($scope.newUser.email)
				});

				$promise.success(function() {
					console.log('SUCCESS');
				}).error(function() {
					console.log('FAILED');
				});
			}
		};
	});

	
