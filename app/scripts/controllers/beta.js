/**
 * Created by Andrew on 6/18/2015.
 */
'use strict';

var app = angular.module('HelpersApp');

app.controller('betaCtrl', function ($scope, $state) {
  var password = 'helping';

  $scope.checkPassword = function () {
    if (password === $scope.subPass.toLowerCase()) {
      $state.go('home');
    } else {
      $scope.failed = true;
    }
  };

  $scope.failed = false;
});
