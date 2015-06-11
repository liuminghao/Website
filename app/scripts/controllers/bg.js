'use strict';

var app = angular.module('HelpersApp');

	app.controller('bgCtrl', function($state, $scope, $filter, before) {
		$scope.currState = $state;

		$scope.$watch('currState.current.name', function() {
			var beforePeriod = before('.', $scope.currState.current.name);

			if (beforePeriod === 'home') {
      	$scope.bgUrl = 'images/backgrounds/' + $filter('camelCase')($scope.currState.current.name) + '.png';
      } else {
      	$scope.bgUrl = 'images/backgrounds/' + $filter('camelCase')(beforePeriod) + '.png';
      }
    });  
	});