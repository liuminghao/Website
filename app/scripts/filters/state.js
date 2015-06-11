'use strict';

var app = angular.module('HelpersApp');

app.filter('state', function() {
	return function(input, char) {
		if (isNaN(input)) {
			var char = char || '.';
			
		}
	}
})