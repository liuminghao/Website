'use strict';

var app = angular.module('HelpersApp');

app.filter('camelCase', function() {
	return function(input, character) {
		if (isNaN(input)) {
			var key = character || '.';
			while (input.indexOf(key) !== -1) {
				var index = input.indexOf(key);//Store index
				input = input.slice(0, index) + input.charAt(index + 1).toUpperCase() + input.slice(index + 2);
				//Remove character from input and uppercase the next letter
			}
		}
		return input;
	};
});