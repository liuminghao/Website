'use strict';

var app = angular.module('HelpersApp');

app.controller('loginCtrl', function ($scope, $state, $http, range, loginApi, user) {
  $scope.loginAttempt = function (loginDetails) {
    var $promise = loginApi.login(loginDetails);

    $promise.success(function(result) {
      $scope.signedIn = true;
      $state.go('account.genInfo');
      $scope.account = user.login(result);
    }).error(function(result){
      $scope.failedLogin(result, loginDetails);
    });
  };

  $scope.failedLogin = function (result, loginDetails) {
    loginDetails.username_or_email = '';
    loginDetails.password = '';

    if (result.error === 100101) {
      alert('Incorrect username and or password');
    } else if (result.error === 100103) {
      alert('Such a user does not exist');
    } else {
      alert('Server error');
    }//Update alert method
  };

  $scope.logOut = function () {
    $scope.loginPopup = false;

    user.logout();
    load();

    $state.go('home');
  };

  $scope.toggleLogin = function () {
    $scope.loginPopup = !$scope.loginPopup;
  };

  $scope.showLogin = function () {
    return $scope.loginPopup && !$scope.signedIn; //User is not logged in and login popup should show
  };

  function load() {
    var loggedIn = user.loadUser();
    if (loggedIn) {
      $scope.account = loggedIn;
      $scope.signedIn = true;
    } else {
      $scope.signedIn = false;
      $scope.account = null;
    }
  }

  load();//Loads the login account from user factory
  $scope.range = range;//A range from a-b (generally days)
  $scope.loginPopup = false;
});

