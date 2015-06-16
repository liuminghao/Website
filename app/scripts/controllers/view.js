'use strict';

var app = angular.module('HelpersApp');

	app.controller('viewCtrl', function($scope, $rootScope, after) {
		$scope.checkPage = function(page) {
			return page === after('.', $rootScope.$state.current.name);
		};//Checks if the current page matches the inputted page. Consider updating this in the future to make it more natural?

	});
