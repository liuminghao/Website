'use strict';

var app = angular.module('HelpersApp');

app.factory("Mailchimp", function($resource) {
  return $resource("https://us11.api.mailchimp/3.0/lists/680f362ae2/members");
});

app.controller('preSignupCtrl', function ($scope, $state, $http, Mailchimp, after) {
  $scope.bcEmail = function () {
    if (after('@', $scope.email) === 'bc.edu') {
      $scope.showAvail = true;
    } else {
      $scope.showNotAvail = true;
    }
    $scope.submitted = true;
  };

  $scope.joinHelpers = function() {
    $state.go('signup');
  };

  $scope.showAvail = false;
  $scope.showNotAvail = false;
  $scope.submitted = false;
});




