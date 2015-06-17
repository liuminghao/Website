'use strict';

var app = angular.module('HelpersApp');

app.controller('loginCtrl', function ($scope, $state, range, loginApi, user) {
  $scope.loginAttempt = function () {
    var result = loginApi.login($scope.loginDetails);//Call loginService API

    if (result.error) {
      if (result) {
        $scope.failedLogin(result);
      } else {
        $scope.signedIn = true;
        $state.go('account.genInfo');
        $scope.account = user.login(result);//Both sets scope.account to result and saves result in user factory
      }
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

