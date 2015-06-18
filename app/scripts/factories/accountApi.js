'use strict';

var app = angular.module('HelpersApp');

app.factory('registerUserApi', function ($http) {
  return {
    register: function (userInfo) {
      var $promise = $http({
        method: 'POST',
        url: 'http://54.172.140.235/api/v1/createuser/',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(userInfo)
      });

      $promise.success(function (result) {
        console.log(result);
        return true;
      })
        .error(function (result) {
          console.log(result);
          return false;
        });
    }
  };
});

app.factory('loginApi', function ($http) {
  return {
    login: function (user) {
      var $promise = $http({
        method: 'POST',
        url: 'http://54.172.140.235/api/v1/user/login/',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(user)
      });

      $promise.success(function (result) {//The user logged in successfully
        return result;
      }).error(function (result) {//The user's credentials were invalid
        return result;
      });
    }
  };
});

app.factory('forgotPasswordApi', function ($http) {
  return {
    forgot: function (email) {
      var $promise = $http({
        method: 'POST',
        url: 'http://54.172.140.235/api/v1/user/password/reset/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(email)
      });

      $promise.success(function () {
        return true;//Reset password message sent
      }).error(function () {
        return false;//The email does not exist
      });
    }
  };
});

app.factory('setPasswordApi', function ($http) {
  return {
    setPassword: function (oldPass, pass1, pass2, apikey) {
      var $promise = $http({
        method: 'POST',
        url: 'http://54.172.140.235/api/v1/user/password/change/',
        headers: {
          'Content-Type': 'application/json',
          'AUTHORIZATION': apikey
        },
        data: JSON.stringify({"oldpassword": oldPass, "password1": pass1, "password2": pass2})
      });

      $promise.success(function () {
        return true;
      }).error(function (result) {
        return result;//Wrong old password, 2 different new passwords
      });
    }
  };
});

app.factory('getInfoApi', function ($http) {
  return {
    print: function (apikey) {
      var $promise = $http({
        method: 'GET',
        url: 'http://54.172.140.235/api/v1/user/3/',
        headers: {
          'Content-Type': 'application/json',
          'AUTHORIZATION': apikey
        }
      });

      $promise.success(function (result) {
        return result;
      }).error(function () {
        console.log('FAILED INFO REQUEST');//No error details in API docs currently
      });
    }
  };
});

app.factory('updateInfoApi', function ($http) {
  return {
    update: function (account, apikey) {
      var $promise = $http({
        method: 'PUT',
        url: 'http://54.172.140.235/api/v1/user/3/',
        headers: {
          'Content-Type': 'application/json',
          'AUTHORIZATION': apikey
        },
        data: JSON.stringify(account)
      });

      $promise.success(function (result) {
        return result;
      }).error(function () {
        console.log('Update error');
      });
    }
  };
});

app.factory('deleteUserApi', function ($http) {
  return {
    deleteUser: function (apikey) {
      var $promise = $http({
        method: 'DELETE',
        url: 'http://54.172.140.235/api/v1/user/7/',
        headers: {
          'Content-Type': 'application/json',
          'AUTHORIZATION': apikey
        }
      });

      $promise.success(function (result) {
        return result;
      }).error(function() {
        console.log('Delete error');
      });
    }
  };
});

app.factory('validationApi', function ($http) {
  return {
    validate: function (email, digit) {
      var $promise = $http({
        method: 'POST',
        url: 'http://54.172.140.235/api/v1/user/digit/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {'email': email, 'digit': digit}
      });

      $promise.success(function () {
        console.log('You have vertified your account');
      }).error(function (result) {
        if (result.status === 'The email already verified') {
          console.log('You have already been vertified');
        } else if (result.status === 'Digit expired') {
          console.log('Sorry this digit has expired, another email has been sent to your account');
        } else if (result.status === 'Invalid digit') {
          console.log('Sorry you entered an incorrect digit');
        } else if (result.status === 'Invalid digit format, the digit should be a 4 digit number') {
          console.log('Please enter a 4 digit number');
        } else {
          console.log('I m afraid I m not sure what went wrong');
        }
      });
    }
  };
});
