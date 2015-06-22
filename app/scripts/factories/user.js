'use strict';

var app = angular.module('HelpersApp');

	app.factory('user', function($localStorage) {
		var user;
		var userService = {};

		userService.login = function(result) {
			user = result;
			$localStorage.account = user;
			return user;
		};

		userService.loadUser = function() {
			if (typeof $localStorage.account === 'undefined' || $localStorage.account === null) {
				return false;//Update in login
			}	else {
				user = $localStorage.account;
				return user;
			}
		};

    userService.logout = function() {
      user = null;
      $localStorage.account = user;
      return user;
    };

		return userService;
	});
