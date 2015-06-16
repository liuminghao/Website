'use strict';

var app = angular.module('HelpersApp');

	app.factory('after', function() {
		return function(character, word) {
			return word.substring(word.indexOf(character) + 1);
		};
	});

	app.factory('before', function() {
		return function(character, word) {
      if (word.indexOf(character) === -1) {
        return word;
      } else {
        return word.substring(0, word.indexOf(character));
      }
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
