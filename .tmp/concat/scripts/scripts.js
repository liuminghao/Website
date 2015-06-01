'use strict';

/**
 * @ngdoc overview
 * @name HelpersApp
 * @description
 * # HelpersApp
 *
 * Main module of the application.
 */
angular
  .module('HelpersApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'uiRouterStyles',
    'ui.router'
  ]);

'use strict';

var app = angular.module('HelpersApp');

app.config( ["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider

		.state('home', {
			url: '/home',
			templateUrl: '../views/home.html'
		})
		.state('aboutUs', {
			url: '/aboutUs',
			templateUrl: '../views/aboutUs.html',
			data: {
				css: '../styles/test.css'
			}
		})
		.state('contactUs', {
			url: '/contactUs',
			templateUrl: '../views/contactUs.html'
		})
		.state('faq', {
			url: '/faq',
			templateUrl: '../views/faq.html'
		})
		.state('preSignup', {
			url: '/preSignup',
			templateUrl: '../views/preSignup.html',
			controller: 'preSignup'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '../views/signup.html'
		})
		.state('footers', {
			abstract: true,
			url: '/footers'
		})
				.state('safetyTips', {
					url: '/safetyTips',
					templateUrl: '../views/footers/safetyTips.html'
				})
				.state('academicIntegrity', {
					url: '/academicIntegrity',
					templateUrl: '../views/footers/academicIntegrity.html'
				})
				.state('termsOfUse', {
					url: '/termsOfUse',
					templateUrl: '../views/footers/termsOfUse.html'
				})
				.state('privacy', {
					url: '/privacy',
					templateUrl: '../views/footers/privacy.html'
				})
		.state('account', {
			abstract: true,
			url: '/account',
			templateUrl: '../views/account.html'
		})
				.state('account.genInfo', {
					url: '/genInfo',
					templateUrl: '../views/account/genInfo.html'
				})
				.state('account.cardInfo', {
					url: '/cardInfo',
					templateUrl: '../views/account/cardInfo.html'
				})
				.state('account.transactionHistory', {
					url: '/transactionHistory',
					templateUrl: '../views/account/transactionHistory.html'
				})
				.state('account.certifications', {
					url: '/certifications',
					templateUrl: '../views/account/certifications.html'
				});

}]);

'use strict';

var app = angular.module('HelpersApp');

	app.controller('loginCtrl', ["$scope", "$localStorage", "$location", "$state", "loginService", "range", "match", "after", "updateInfo", "getInfo", function($scope, $localStorage, $location, $state, 
				loginService, range, match, after, updateInfo, getInfo) {

		$scope.logUserIn = function(result) {
			$scope.signedIn = true;
			$scope.account = result;
			$scope.save();
			$location.path('account');
		};

		$scope.failedLogin = function() {
			console.log('incorrect details');
		};

		$scope.loginAttempt = function(loginDetails) {
			loginService.login(loginDetails, $scope);//Call loginService API
		};

		$scope.logOut = function() {
			$scope.signedIn = false;
			$scope.account = null;
			$scope.loginPopup = false;
			$scope.save();
			$location.path('home');
		};

		$scope.updateInfo = function() {/*FIX THIS */
			var apikey =  'ApiKey ' + $scope.account.email + ':' + $scope.account.apikey;
			updateInfo.update($scope, apikey);
			console.log($scope.account);
		};

		$scope.printInfo = function() {
			var apikey =  'ApiKey ' + $scope.account.email + ':' + $scope.account.apikey;
			getInfo.print($scope, apikey);
		};

		$scope.toggleLogin = function() {
			$scope.loginPopup = !$scope.loginPopup;
		};

		$scope.showLogin = function() {
			if ($scope.loginPopup && !$scope.signedIn) {
				return true;
			}/* User is not logged in and they have clicked the login button */
			else {
				return false;
			}
		};

		$scope.save = function() {
			$scope.storage.account = $scope.account;
		};

		$scope.load = function() {
			if (typeof $scope.storage.account === 'undefined' || $scope.storage.account === null) {
				$scope.account = null;
				$scope.signedIn = false;
			}
			else {
				$scope.account = $scope.storage.account;
				$scope.signedIn = true;
			}
		};

		$scope.checkPage = function(page) {
			if (match(page, after('.', $state.current.name))) {
				return true;
			} else {
				return false;
			}
		};//Checks if the current page matches the inputted page. Consider updating this in the future to make it more natural?

		$scope.storage = $localStorage;//GET RID OF SAVE AND LOAD 
		$scope.load();//Loads the login account from cookies
		$scope.range = range;//A range from a-b (generally days)
		$scope.loginPopup = false;
	}]);

	app.factory('loginService', ["$http", function($http) {
		return {
			login: function(user, $scope) {
				var $promise = $http({
	      	method: 'POST',
	      	url: 'http://54.172.140.235/api/v1/user/login/',
	      	headers: {'Content-Type': 'application/json'},
	      	data: JSON.stringify(user)
	      });

	      $promise.success(function(result) {//The user logged in successfully
	      	$scope.logUserIn(result);
	      }).error(function() {//The user's credentials were invalid
	      	$scope.failedLogin();
	      });
			}
		};
	}]);

	app.factory('updateInfo', ["$http", function($http) {
		return {
			update: function($scope, apikey) {
				var $promise = $http({
					method: 'PUT',
					url: 'http://54.172.140.235/api/v1/user/3/',
					headers: {
						'Content-Type': 'application/json',
						'AUTHORIZATION': apikey
					},
					data: $scope.account
				});

				$promise.success(function() {
					console.log('Updated information');
					console.log('UPDATE THIS FUNCTION!');
				}).error(function() {
					console.log('YOU FAILED');
				});
			}
		};
	}]);

	app.factory('getInfo', ["$http", function($http) {
		return {
			print: function($scope, apikey) {
				var $promise = $http({
					method: 'GET',
					url: 'http://54.172.140.235/api/v1/user/3/',
					headers: {
						'Content-Type': 'application/json',
						'AUTHORIZATION': apikey
					}
				});

				$promise.success(function(result) {
					console.log(result);
				}).error(function() {
					console.log('FAILED INFO REQUEST');
				});
			}
		};
	}]);

	app.factory('forgotPassword', ["$http", function($http) {
		return {
			forgot: function($scope) {
				var $promise = $http({
					method: 'POST',
					url: 'http://54.172.140.235/api/v1/user/password/reset/',
					headers: {
						'Content-Type': 'application/json'
					},
					data: $scope.account.email
				});

				$promise.success(function() {
					console.log('Your password has been reset, check your email');
				}).error(function() {
					console.log('You entered a non existent email');
				});
			}
		};
	}]);

	app.factory('validation', ["$http", function($http) {
		return {
			validate: function(email, digit) {
				var $promise = $http({
					method: 'POST',
					url: 'http://54.172.140.235/api/v1/user/digit/',
					headers: {
						'Content-Type': 'application/json',
					},
					data: {'email': email, 'digit': digit }
				});

				$promise.success(function() {
					console.log('You have vertified your account');
				}).error(function(result) {
					if (result.status === 'The email already verified') {
						console.log('You have already been vertified');
					} else if (result.status  === 'Digit expired') {
						console.log('Sorry this digit has expired, another email has been sent to your account');
					} else if (result.status  === 'Invalid digit') {
						console.log('Sorry you entered an incorrect digit');
					} else if (result.status  === 'Invalid digit format, the digit should be a 4 digit number') {
						console.log('Please enter a 4 digit number');
					} else {
						console.log('I m afraid I m not sure what went wrong');
					}
				});
			}
		};
	}]);


'use strict';

var app = angular.module('HelpersApp');

app.controller('preSignup', ["$scope", "$location", "$http", "after", function($scope, $location, $http, after) {
		
		$scope.bcEmail = function() {
			if (after('@', $scope.newUser.email) === 'bc.edu') {
				$location.path('signup');
			}
			else {
				$scope.notAvailable = true;
			}
		};

		$scope.submitPreForm = function(subscribe) {
			if (subscribe) {
				var $promise = $http({
					url: 'php/store-address.php',
					data: 'ajax=true&email=' +  escape($scope.newUser.email)
				});

				$promise.success(function() {
					console.log('SUCCESS');
				}).error(function() {
					console.log('FAILED');
				});
			}
		};
	}]);

	

'use strict';

var app = angular.module('HelpersApp');

app.controller('signupCtrl', ["$scope", "range", "registerUser", "after", "match", function($scope, range, registerUser, after, match) {
	$scope.passValidate = true;
	$scope.emailValidate = true;
	$scope.bcValidate = true;

	$scope.signupSubmit = function(isValid) {									/* test function */
		if ($scope.checkValid(isValid)) {
			alert('hi');
		}
		else {
			alert('no');
		}
	}

	$scope.checkValid = function(isValid) {
		return $scope.checkPass() && $scope.checkEmail() && $scope.bcEmail() && isValid;
	} 

	$scope.checkPass = function() {
		$scope.passValidate = match($scope.confirmPassword, $scope.newUser.password);
		return $scope.passValidate;
	}

	$scope.checkEmail = function() {
		$scope.emailValidate = match($scope.confirmEmail, $scope.newUser.email);
		return $scope.emailValidate;
	}

	$scope.bcEmail = function() {
		$scope.bcValidate = eval(after('@', $scope.newUser.email) === 'bc.edu');
		return $scope.bcValidate;
	}

	$scope.register = function(newUser, isValid) {
		if ($scope.checkValid(isValid)) {
			registerUser.register($scope, newUser);
		}
	}

	$scope.range = range;
}]);

app.factory('registerUser', ["$http", function($http) {
	return {
		register: function($scope, userInfo) {
			var $promise = $http({
				method: "POST",
				url: "http://54.172.140.235/api/v1/createuser/",
				headers: {'Content-Type': "application/json"},
				data: JSON.stringify(userInfo)
			});

			$promise.success(function(result) {
				alert("Congratulations on signing up!");
			})
		}
	}
}]);
'use strict';

var app = angular.module('HelpersApp');

	app.controller("uploadCtrl", ["$scope", "fileReader", function($scope, fileReader) {
		$scope.getFile = function() {
			fileReader.readAsDataUrl($scope.file, $scope)
				.then(function(result) {
					$scope.imageSrc = result;
				});
		}
	}]);

	app.directive('ngFileSelect', function() {
		return {
			link: function($scope, el) {
				el.bind("change", function(e) {
					$scope.file = (e.srcElement || e.target).files[0];
					$scope.getFile();
				})
			}
		}
	});

(function (module) {
   
  var fileReader = function ($q, $log) {

      var onLoad = function(reader, deferred, scope) {
          return function () {
              scope.$apply(function () {
                  deferred.resolve(reader.result);
              });
          };
      };

      var onError = function (reader, deferred, scope) {
          return function () {
              scope.$apply(function () {
                  deferred.reject(reader.result);
              });
          };
      };

      var onProgress = function(reader, scope) {
          return function (event) {
              scope.$broadcast("fileProgress",
                  {
                      total: event.total,
                      loaded: event.loaded
                  });
          };
      };

      var getReader = function(deferred, scope) {
          var reader = new FileReader();
          reader.onload = onLoad(reader, deferred, scope);
          reader.onerror = onError(reader, deferred, scope);
          reader.onprogress = onProgress(reader, scope);
          return reader;
      };

      var readAsDataURL = function (file, scope) {
          var deferred = $q.defer();
           
          var reader = getReader(deferred, scope);         
          reader.readAsDataURL(file);
           
          return deferred.promise;
      };

      return {
          readAsDataUrl: readAsDataURL  
      };
  };

  module.factory("fileReader", ["$q", "$log", fileReader]);
 
}(angular.module('HelpersApp')));

/* Popup used for login */
'use strict';

var app = angular.module('HelpersApp');

app.directive('modal', function () {
  return {
    template: '<div class="modal fade">' + 
        '<div class="modal-dialog">' + 
          '<div class="modal-content">' + 
            '<div class="modal-header">' + 
              '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
              '<h4 class="modal-title">{{ title }}</h4>' + 
            '</div>' + 
            '<div class="modal-body" ng-transclude></div>' + 
          '</div>' + 
        '</div>' + 
      '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value){
        if(value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
});
'use strict';

var app = angular.module('HelpersApp');

	app.factory('after', function() {
		return function(character, word) {
			var afterChar = word.substring(word.indexOf(character) + 1);
			return afterChar;
		};
	});

	app.factory('range', function() {
		return function(start, end) {
			var range = [];
			for (var i=end; i >= start; i--) {
				range.push(i);
			}
			return range;
		};
	});

	app.factory('match', function() {
		return function(itemA, itemB) {
			if (itemA === itemB) {
				return true;
			}
			else {
				return false;
			}
		};
	});
/**
  * x is a value between 0 and 1, indicating where in the animation you are.
  */
var duScrollDefaultEasing = function (x) {
  'use strict';

  if(x < 0.5) {
    return Math.pow(x*2, 2)/2;
  }
  return 1-Math.pow((1-x)*2, 2)/2;
};

angular.module('duScroll', [
  'duScroll.scrollspy',
  'duScroll.smoothScroll',
  'duScroll.scrollContainer',
  'duScroll.spyContext',
  'duScroll.scrollHelpers'
])
  //Default animation duration for smoothScroll directive
  .value('duScrollDuration', 350)
  //Scrollspy debounce interval, set to 0 to disable
  .value('duScrollSpyWait', 100)
  //Wether or not multiple scrollspies can be active at once
  .value('duScrollGreedy', false)
  //Default offset for smoothScroll directive
  .value('duScrollOffset', 0)
  //Default easing function for scroll animation
  .value('duScrollEasing', duScrollDefaultEasing)
  //Whether or not to activate the last scrollspy, when page/container bottom is reached
  .value('duScrollBottomSpy', false);


angular.module('duScroll.scrollHelpers', ['duScroll.requestAnimation'])
.run(['$window', '$q', 'cancelAnimation', 'requestAnimation', 'duScrollEasing', 'duScrollDuration', 'duScrollOffset', function($window, $q, cancelAnimation, requestAnimation, duScrollEasing, duScrollDuration, duScrollOffset) {
  'use strict';

  var proto = {};

  var isDocument = function(el) {
    return (typeof HTMLDocument !== 'undefined' && el instanceof HTMLDocument) || (el.nodeType && el.nodeType === el.DOCUMENT_NODE);
  };

  var isElement = function(el) {
    return (typeof HTMLElement !== 'undefined' && el instanceof HTMLElement) || (el.nodeType && el.nodeType === el.ELEMENT_NODE);
  };

  var unwrap = function(el) {
    return isElement(el) || isDocument(el) ? el : el[0];
  };

  proto.duScrollTo = function(left, top, duration, easing) {
    var aliasFn;
    if(angular.isElement(left)) {
      aliasFn = this.duScrollToElement;
    } else if(angular.isDefined(duration)) {
      aliasFn = this.duScrollToAnimated;
    }
    if(aliasFn) {
      return aliasFn.apply(this, arguments);
    }
    var el = unwrap(this);
    if(isDocument(el)) {
      return $window.scrollTo(left, top);
    }
    el.scrollLeft = left;
    el.scrollTop = top;
  };

  var scrollAnimation, deferred;
  proto.duScrollToAnimated = function(left, top, duration, easing) {
    if(duration && !easing) {
      easing = duScrollEasing;
    }
    var startLeft = this.duScrollLeft(),
        startTop = this.duScrollTop(),
        deltaLeft = Math.round(left - startLeft),
        deltaTop = Math.round(top - startTop);

    var startTime = null, progress = 0;
    var el = this;

    var cancelOnEvents = 'scroll mousedown mousewheel touchmove keydown';
    var cancelScrollAnimation = function($event) {
      if (!$event || (progress && $event.which > 0)) {
        el.unbind(cancelOnEvents, cancelScrollAnimation);
        cancelAnimation(scrollAnimation);
        deferred.reject();
        scrollAnimation = null;
      }
    };

    if(scrollAnimation) {
      cancelScrollAnimation();
    }
    deferred = $q.defer();

    if(duration === 0 || (!deltaLeft && !deltaTop)) {
      if(duration === 0) {
        el.duScrollTo(left, top);
      }
      deferred.resolve();
      return deferred.promise;
    }

    var animationStep = function(timestamp) {
      if (startTime === null) {
        startTime = timestamp;
      }

      progress = timestamp - startTime;
      var percent = (progress >= duration ? 1 : easing(progress/duration));

      el.scrollTo(
        startLeft + Math.ceil(deltaLeft * percent),
        startTop + Math.ceil(deltaTop * percent)
      );
      if(percent < 1) {
        scrollAnimation = requestAnimation(animationStep);
      } else {
        el.unbind(cancelOnEvents, cancelScrollAnimation);
        scrollAnimation = null;
        deferred.resolve();
      }
    };

    //Fix random mobile safari bug when scrolling to top by hitting status bar
    el.duScrollTo(startLeft, startTop);

    el.bind(cancelOnEvents, cancelScrollAnimation);

    scrollAnimation = requestAnimation(animationStep);
    return deferred.promise;
  };

  proto.duScrollToElement = function(target, offset, duration, easing) {
    var el = unwrap(this);
    if(!angular.isNumber(offset) || isNaN(offset)) {
      offset = duScrollOffset;
    }
    var top = this.duScrollTop() + unwrap(target).getBoundingClientRect().top - offset;
    if(isElement(el)) {
      top -= el.getBoundingClientRect().top;
    }
    return this.duScrollTo(0, top, duration, easing);
  };

  proto.duScrollLeft = function(value, duration, easing) {
    if(angular.isNumber(value)) {
      return this.duScrollTo(value, this.duScrollTop(), duration, easing);
    }
    var el = unwrap(this);
    if(isDocument(el)) {
      return $window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
    }
    return el.scrollLeft;
  };
  proto.duScrollTop = function(value, duration, easing) {
    if(angular.isNumber(value)) {
      return this.duScrollTo(this.duScrollLeft(), value, duration, easing);
    }
    var el = unwrap(this);
    if(isDocument(el)) {
      return $window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    }
    return el.scrollTop;
  };

  proto.duScrollToElementAnimated = function(target, offset, duration, easing) {
    return this.duScrollToElement(target, offset, duration || duScrollDuration, easing);
  };

  proto.duScrollTopAnimated = function(top, duration, easing) {
    return this.duScrollTop(top, duration || duScrollDuration, easing);
  };

  proto.duScrollLeftAnimated = function(left, duration, easing) {
    return this.duScrollLeft(left, duration || duScrollDuration, easing);
  };

  angular.forEach(proto, function(fn, key) {
    angular.element.prototype[key] = fn;

    //Remove prefix if not already claimed by jQuery / ui.utils
    var unprefixed = key.replace(/^duScroll/, 'scroll');
    if(angular.isUndefined(angular.element.prototype[unprefixed])) {
      angular.element.prototype[unprefixed] = fn;
    }
  });

}]);


//Adapted from https://gist.github.com/paulirish/1579671
angular.module('duScroll.polyfill', [])
.factory('polyfill', ['$window', function($window) {
  'use strict';

  var vendors = ['webkit', 'moz', 'o', 'ms'];

  return function(fnName, fallback) {
    if($window[fnName]) {
      return $window[fnName];
    }
    var suffix = fnName.substr(0, 1).toUpperCase() + fnName.substr(1);
    for(var key, i = 0; i < vendors.length; i++) {
      key = vendors[i]+suffix;
      if($window[key]) {
        return $window[key];
      }
    }
    return fallback;
  };
}]);

angular.module('duScroll.requestAnimation', ['duScroll.polyfill'])
.factory('requestAnimation', ['polyfill', '$timeout', function(polyfill, $timeout) {
  'use strict';

  var lastTime = 0;
  var fallback = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = $timeout(function() { callback(currTime + timeToCall); },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  return polyfill('requestAnimationFrame', fallback);
}])
.factory('cancelAnimation', ['polyfill', '$timeout', function(polyfill, $timeout) {
  'use strict';

  var fallback = function(promise) {
    $timeout.cancel(promise);
  };

  return polyfill('cancelAnimationFrame', fallback);
}]);


angular.module('duScroll.spyAPI', ['duScroll.scrollContainerAPI'])
.factory('spyAPI', ['$rootScope', '$timeout', '$window', '$document', 'scrollContainerAPI', 'duScrollGreedy', 'duScrollSpyWait', 'duScrollBottomSpy', function($rootScope, $timeout, $window, $document, scrollContainerAPI, duScrollGreedy, duScrollSpyWait, duScrollBottomSpy) {
  'use strict';

  var createScrollHandler = function(context) {
    var timer = false, queued = false;
    var handler = function() {
      queued = false;
      var container = context.container,
          containerEl = container[0],
          containerOffset = 0,
          bottomReached;

      if (typeof HTMLElement !== 'undefined' && containerEl instanceof HTMLElement || containerEl.nodeType && containerEl.nodeType === containerEl.ELEMENT_NODE) {
        containerOffset = containerEl.getBoundingClientRect().top;
        bottomReached = Math.round(containerEl.scrollTop + containerEl.clientHeight) >= containerEl.scrollHeight;
      } else {
        bottomReached = Math.round($window.pageYOffset + $window.innerHeight) >= $document[0].body.scrollHeight;
      }
      var compareProperty = (duScrollBottomSpy && bottomReached ? 'bottom' : 'top');

      var i, currentlyActive, toBeActive, spies, spy, pos;
      spies = context.spies;
      currentlyActive = context.currentlyActive;
      toBeActive = undefined;

      for(i = 0; i < spies.length; i++) {
        spy = spies[i];
        pos = spy.getTargetPosition();
        if (!pos) continue;

        if((duScrollBottomSpy && bottomReached) || (pos.top + spy.offset - containerOffset < 20 && (duScrollGreedy || pos.top*-1 + containerOffset) < pos.height)) {
          //Find the one closest the viewport top or the page bottom if it's reached
          if(!toBeActive || toBeActive[compareProperty] < pos[compareProperty]) {
            toBeActive = {
              spy: spy
            };
            toBeActive[compareProperty] = pos[compareProperty];
          }
        }
      }

      if(toBeActive) {
        toBeActive = toBeActive.spy;
      }
      if(currentlyActive === toBeActive || (duScrollGreedy && !toBeActive)) return;
      if(currentlyActive) {
        currentlyActive.$element.removeClass('active');
        $rootScope.$broadcast('duScrollspy:becameInactive', currentlyActive.$element);
      }
      if(toBeActive) {
        toBeActive.$element.addClass('active');
        $rootScope.$broadcast('duScrollspy:becameActive', toBeActive.$element);
      }
      context.currentlyActive = toBeActive;
    };

    if(!duScrollSpyWait) {
      return handler;
    }

    //Debounce for potential performance savings
    return function() {
      if(!timer) {
        handler();
        timer = $timeout(function() {
          timer = false;
          if(queued) {
            handler();
          }
        }, duScrollSpyWait, false);
      } else {
        queued = true;
      }
    };
  };

  var contexts = {};

  var createContext = function($scope) {
    var id = $scope.$id;
    var context = {
      spies: []
    };

    context.handler = createScrollHandler(context);
    contexts[id] = context;

    $scope.$on('$destroy', function() {
      destroyContext($scope);
    });

    return id;
  };

  var destroyContext = function($scope) {
    var id = $scope.$id;
    var context = contexts[id], container = context.container;
    if(container) {
      container.off('scroll', context.handler);
    }
    delete contexts[id];
  };

  var defaultContextId = createContext($rootScope);

  var getContextForScope = function(scope) {
    if(contexts[scope.$id]) {
      return contexts[scope.$id];
    }
    if(scope.$parent) {
      return getContextForScope(scope.$parent);
    }
    return contexts[defaultContextId];
  };

  var getContextForSpy = function(spy) {
    var context, contextId, scope = spy.$scope;
    if(scope) {
      return getContextForScope(scope);
    }
    //No scope, most likely destroyed
    for(contextId in contexts) {
      context = contexts[contextId];
      if(context.spies.indexOf(spy) !== -1) {
        return context;
      }
    }
  };

  var isElementInDocument = function(element) {
    while (element.parentNode) {
      element = element.parentNode;
      if (element === document) {
        return true;
      }
    }
    return false;
  };

  var addSpy = function(spy) {
    var context = getContextForSpy(spy);
    if (!context) return;
    context.spies.push(spy);
    if (!context.container || !isElementInDocument(context.container)) {
      if(context.container) {
        context.container.off('scroll', context.handler);
      }
      context.container = scrollContainerAPI.getContainer(spy.$scope);
      context.container.on('scroll', context.handler).triggerHandler('scroll');
    }
  };

  var removeSpy = function(spy) {
    var context = getContextForSpy(spy);
    if(spy === context.currentlyActive) {
      context.currentlyActive = null;
    }
    var i = context.spies.indexOf(spy);
    if(i !== -1) {
      context.spies.splice(i, 1);
    }
    spy.$element = null;
  };

  return {
    addSpy: addSpy,
    removeSpy: removeSpy,
    createContext: createContext,
    destroyContext: destroyContext,
    getContextForScope: getContextForScope
  };
}]);


angular.module('duScroll.scrollContainerAPI', [])
.factory('scrollContainerAPI', ['$document', function($document) {
  'use strict';

  var containers = {};

  var setContainer = function(scope, element) {
    var id = scope.$id;
    containers[id] = element;
    return id;
  };

  var getContainerId = function(scope) {
    if(containers[scope.$id]) {
      return scope.$id;
    }
    if(scope.$parent) {
      return getContainerId(scope.$parent);
    }
    return;
  };

  var getContainer = function(scope) {
    var id = getContainerId(scope);
    return id ? containers[id] : $document;
  };

  var removeContainer = function(scope) {
    var id = getContainerId(scope);
    if(id) {
      delete containers[id];
    }
  };

  return {
    getContainerId:   getContainerId,
    getContainer:     getContainer,
    setContainer:     setContainer,
    removeContainer:  removeContainer
  };
}]);


angular.module('duScroll.smoothScroll', ['duScroll.scrollHelpers', 'duScroll.scrollContainerAPI'])
.directive('duSmoothScroll', ['duScrollDuration', 'duScrollOffset', 'scrollContainerAPI', function(duScrollDuration, duScrollOffset, scrollContainerAPI) {
  'use strict';

  return {
    link : function($scope, $element, $attr) {
      $element.on('click', function(e) {
        if((!$attr.href || $attr.href.indexOf('#') === -1) && $attr.duSmoothScroll === '') return;

        var id = $attr.href ? $attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1) : $attr.duSmoothScroll;

        var target = document.getElementById(id) || document.getElementsByName(id)[0];
        if(!target || !target.getBoundingClientRect) return;

        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();

        var offset    = $attr.offset ? parseInt($attr.offset, 10) : duScrollOffset;
        var duration  = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration;
        var container = scrollContainerAPI.getContainer($scope);

        container.duScrollToElement(
          angular.element(target),
          isNaN(offset) ? 0 : offset,
          isNaN(duration) ? 0 : duration
        );
      });
    }
  };
}]);


angular.module('duScroll.spyContext', ['duScroll.spyAPI'])
.directive('duSpyContext', ['spyAPI', function(spyAPI) {
  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink($scope, iElement, iAttrs, controller) {
          spyAPI.createContext($scope);
        }
      };
    }
  };
}]);


angular.module('duScroll.scrollContainer', ['duScroll.scrollContainerAPI'])
.directive('duScrollContainer', ['scrollContainerAPI', function(scrollContainerAPI){
  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink($scope, iElement, iAttrs, controller) {
          iAttrs.$observe('duScrollContainer', function(element) {
            if(angular.isString(element)) {
              element = document.getElementById(element);
            }

            element = (angular.isElement(element) ? angular.element(element) : iElement);
            scrollContainerAPI.setContainer($scope, element);
            $scope.$on('$destroy', function() {
              scrollContainerAPI.removeContainer($scope);
            });
          });
        }
      };
    }
  };
}]);


angular.module('duScroll.scrollspy', ['duScroll.spyAPI'])
.directive('duScrollspy', ['spyAPI', 'duScrollOffset', '$timeout', '$rootScope', function(spyAPI, duScrollOffset, $timeout, $rootScope) {
  'use strict';

  var Spy = function(targetElementOrId, $scope, $element, offset) {
    if(angular.isElement(targetElementOrId)) {
      this.target = targetElementOrId;
    } else if(angular.isString(targetElementOrId)) {
      this.targetId = targetElementOrId;
    }
    this.$scope = $scope;
    this.$element = $element;
    this.offset = offset;
  };

  Spy.prototype.getTargetElement = function() {
    if (!this.target && this.targetId) {
      this.target = document.getElementById(this.targetId) || document.getElementsByName(this.targetId)[0];
    }
    return this.target;
  };

  Spy.prototype.getTargetPosition = function() {
    var target = this.getTargetElement();
    if(target) {
      return target.getBoundingClientRect();
    }
  };

  Spy.prototype.flushTargetCache = function() {
    if(this.targetId) {
      this.target = undefined;
    }
  };

  return {
    link: function ($scope, $element, $attr) {
      var href = $attr.ngHref || $attr.href;
      var targetId;

      if (href && href.indexOf('#') !== -1) {
        targetId = href.replace(/.*(?=#[^\s]+$)/, '').substring(1);
      } else if($attr.duScrollspy) {
        targetId = $attr.duScrollspy;
      } else if($attr.duSmoothScroll) {
        targetId = $attr.duSmoothScroll;
      }
      if(!targetId) return;

      // Run this in the next execution loop so that the scroll context has a chance
      // to initialize
      $timeout(function() {
        var spy = new Spy(targetId, $scope, $element, -($attr.offset ? parseInt($attr.offset, 10) : duScrollOffset));
        spyAPI.addSpy(spy);

        $scope.$on('$locationChangeSuccess', spy.flushTargetCache.bind(spy));
        var deregisterOnStateChange = $rootScope.$on('$stateChangeSuccess', spy.flushTargetCache.bind(spy));
        $scope.$on('$destroy', function() {
          spyAPI.removeSpy(spy);
          deregisterOnStateChange();
        });
      }, 0, false);
    }
  };
}]);
