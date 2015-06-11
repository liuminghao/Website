'use strict';

var app = angular.module('HelpersApp');

	app.factory('after', function() {
		return function(character, word) {
			var afterChar = word.substring(word.indexOf(character) + 1);
			return afterChar;
		};
	});

	app.factory('before', function() {
		return function(character, word) {
			var beforeChar = word.substring(0, word.indexOf(character));
			return beforeChar;
		};
	});

	app.factory('range', function() {
		return function(start, end) {
			var range = [];
			for (var i=end; i >= start; i--) {
				range.push(i);
			}
			return range;
		};
	});

	app.factory('match', function() {
		return function(itemA, itemB) {
			if (itemA === itemB) {
				return true;
			}
			else {
				return false;
			}
		};
	});

