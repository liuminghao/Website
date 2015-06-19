'use strict';

var app = angular.module('HelpersApp');

app.controller('loginCtrl', function ($scope, $state, range, loginApi) {
  $scope.loginAttempt = function (loginDetails) {
    var result = loginApi.login(loginDetails);//Call loginService API
    console.log(result);
    if (result) {
      console.log('hi');
      $scope.signedIn = true;
      $state.go('account.genInfo');
      $scope.account = user.login(result);
    }
  };

  $scope.failedLogin = function (result) {
    $scope.loginDetails.username_or_email = '';
    $scope.loginDetails.password = '';

    if (result.error === 100101) {
      console.log('Incorrect username and or password');
    } else if (result.error === 100103) {
      console.log('Such a user does not exist');
    } else {
      console.log('Server error');
    }//Update this to print info to the user
  };

  $scope.logOut = function () {
    $scope.signedIn = false;
    $scope.account = null;
    $scope.loginPopup = false;
    $scope.save();
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

