'use strict';

var app = angular.module('HelpersApp');

app.config( function($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
      views: {
        'title': {
          templateUrl: '../views/homeLanding.html'
        },
        'body': {
          templateUrl: '../views/homeBody.html'
        }
      }
		})
		.state('aboutUs', {
			url: '/aboutUs',
      views: {
        'title': {
          template: 'About us'
        },
        'body': {
          templateUrl: '../views/aboutUs.html'
        }
      }
		})
		.state('contactUs', {
			url: '/contactUs',
      views: {
        'title': {
          template: 'Contact Us'
        },
        'body': {
          templateUrl: '../views/contactUs.html'
        }
      }
		})
		.state('faq', {
			abstract: true,
			url: '/faq',
      views: {
        'title': {
          template: 'FAQ'
        },
        'body': {
          templateUrl: '../views/faq/faq.html'
        }
      }
		})
				.state('faq.everyone', {
					url: '/everyone',
					templateUrl: '../views/faq/everyone.html'
				})
				.state('faq.tutor', {
					url: '/tutor',
					templateUrl: '../views/faq/tutor.html'
				})
				.state('faq.student', {
					url: '/student',
					templateUrl: '../views/faq/student.html'
				})
		.state('preSignup', {
			url: '/preSignup',
      views: {
        'title': {
          template: ' '
        },
        'body': {
          templateUrl: '../views/preSignup.html'
        }
      }
		})
		.state('signup', {
			url: '/signup',
      views: {
        'title': {
          template: 'Signup'
        },
        'body': {
          templateUrl: '../views/signup.html'
        }
      }
		})
				.state('safetyTips', {
					url: '/safetyTips',
					views: {
            'title': {
              template: 'Safety Tips'
            },
            'body': {
              templateUrl: '../views/footers/safetyTips.html'
            }
          }
				})
				.state('academicIntegrity', {
					url: '/academicIntegrity',
          views: {
            'title': {
              template: 'Academic Integrity'
            },
            'body': {
              templateUrl: '../views/footers/academicIntegrity.html'
            }
          }
				})
				.state('termsOfUse', {
					url: '/termsOfUse',
          views: {
            'title': {
              template: 'Terms of Use'
            },
            'body': {
              templateUrl: '../views/footers/termsOfUse.html'
            }
          }
				})
				.state('privacy', {
					url: '/privacy',
          views: {
            'title': {
              template: 'Privacy'
            },
            'body': {
              templateUrl: '../views/footers/privacy.html'
            }
          }
				})
		.state('account', {
			abstract: true,
			url: '/account',
      views: {
        'title': {
          template: 'My Account'
        },
        'body': {
          templateUrl: '../views/account/account.html'
        }
      }
		})
				.state('account.genInfo', {
					url: '/genInfo',
					templateUrl: '../views/account/genInfo.html'
				})
				.state('account.transactionHistory', {
					url: '/transactionHistory',
					templateUrl: '../views/account/transactionHistory.html'
				})
				.state('account.certifications', {
					url: '/certifications',
					templateUrl: '../views/account/certifications.html'
				});

});
