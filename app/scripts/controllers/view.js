'use strict';

var app = angular.module('HelpersApp');

	app.controller('viewCtrl', function(match, $scope, $rootScope, after) {
		$scope.checkPage = function(page) {
			if (match(page, after('.', $rootScope.$state.current.name))) {
				return true;
			} else {
				return false;
			}
		};//Checks if the current page matches the inputted page. Consider updating this in the future to make it more natural?

	});