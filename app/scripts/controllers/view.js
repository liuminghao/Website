'use strict';

var app = angular.module('HelpersApp');

	app.controller('viewCtrl', function(match, $state, $scope, after) {
		$scope.checkPage = function(page) {
			if (match(page, after('.', $state.current.name))) {
				return true;
			} else {
				return false;
			}
		};//Checks if the current page matches the inputted page. Consider updating this in the future to make it more natural?

	});