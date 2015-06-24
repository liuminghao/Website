/**
 * Created by Andrew on 6/15/2015.
 */
'use strict';

var app = angular.module('HelpersApp');

app.controller('scrollCtrl', function($scope, $anchorScroll, $window) {
  $scope.scrollTo = function(target) {
    $anchorScroll(target);
  };

  $scope.atTop = function() {
    if ($window.pageYOffset <= 100) {
      return true;
    } else {
      return false;
    }
  };//Not functional yet!
});
