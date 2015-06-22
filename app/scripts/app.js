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
});//On launch assign $state to general rootScope


