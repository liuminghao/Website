'use strict';

/**
 * @ngdoc overview
 * @name HelpersApp
 * @description
 * # HelpersApp
 *
 * Main module of the application.
 */
var app = angular
  .module('HelpersApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router'
  ]);

app.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
  $rootScope.apiHost = 'http://54.172.140.235';
});


