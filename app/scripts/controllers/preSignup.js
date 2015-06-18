'use strict';

var app = angular.module('HelpersApp');

app.factory("Mailchimp", function($resource) {
  return $resource("https://us11.api.mailchimp/3.0/lists/680f362ae2/members");
});

app.controller('preSignupCtrl', function ($scope, $state, $http, Mailchimp, after) {
  $scope.bcEmail = function () {
    if (after('@', $scope.newUser.email) === 'bc.edu') {
      //$state.go('signup');
    }
    else {
      $scope.notAvailable = true;
    }
  };

  $scope.submitPreForm = function () {
    //Mailchimp.save({email_address: $scope.newUser.email, status: 'pending'});

    var $promise = $http({
      method: 'POST',
      url: '//helpers.us11.list-manage.com/subscribe/post?u=ac52c0e2e1d3f827076d7c72b&amp;id=680f362ae2',
      data: JSON.stringify({
        "email_address": $scope.newUser.email,
        "status": 'pending'
      })
    });

    $promise.success(function () {
      console.log('SUCCESS');
    }).error(function () {
      console.log('FAILED');
    });


  };
});




