/**
 * Created by Andrew on 6/15/2015.
 */
'use strict';

var app = angular.module('HelpersApp');

app.controller('scrollCtrl', function($scope, $anchorScroll) {
  $scope.scrollTo = function(target) {
    $anchorScroll(target);
  };
});
