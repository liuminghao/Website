/**
 * Created by Andrew on 6/16/2015.
 */
'use strict';

var app = angular.module('HelpersApp');

app.controller('accountCtrl', function ($scope, updateInfoApi, getInfoApi, user) {
  $scope.updateInfo = function () {
    var cleanKeys;
    cleanKeys = ['DoB', 'MoB', 'YoB'];
    for (var key in cleanKeys) {
      $scope.account[key] = $scope.account.profile[key];
      delete $scope.account.profile[key];
    }

    var apikey = 'ApiKey ' + $scope.account.email + ':' + $scope.account.apikey;

    $scope.account = updateInfoApi.update(apikey);
    console.log($scope.account);
  };

  $scope.printInfo = function () {
    var apikey = 'ApiKey ' + $scope.account.email + ':' + $scope.account.apikey;
    getInfoApi.print(apikey);
  };

  $scope.accountPages = [
    {
      title: 'General Information',
      source: 'genInfo'
    },
    {
      title: 'Card Information',
      source: 'cardInfo'
    },
    {
      title: 'Transaction History',
      source: 'transactionHistory'
    },
    {
      title: 'Certifications',
      source: 'certifications'
    }
  ];

  function load() {
    var loggedIn = user.loadUser();
    if (loggedIn) {
      $scope.account = loggedIn;
    }
  }

  load();
});
