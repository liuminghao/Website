'use strict';

var app = angular.module('HelpersApp');

app.filter('camelCase', function() {
	return function(input, character) {
		if (isNaN(input)) {
			var key = character || '.';

			var iterations = 0;
			while ((input.indexOf(key) !== -1) && iterations < 4) {//Note limits to 4 iterations to prevent infinite loops
				var index = input.indexOf(key);//Store index
				input = input.slice(0, index) + input.charAt(index + 1).toUpperCase() + input.slice(index + 2);
				//Remove character from input and uppercase the next letter

				iterations = iterations + 1;
			}
		}
		return input;
	};
});