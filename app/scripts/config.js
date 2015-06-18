'use strict';

var app = angular.module('HelpersApp');

app.config( function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/beta');
	//$locationProvider.html5Mode(true);

	$stateProvider

    .state('beta', {
      url: '/beta',
      templateUrl: '../views/beta.html'
    })

		.state('home', {
			url: '/home',
			templateUrl: '../views/home.html'
		})
		.state('aboutUs', {
			url: '/aboutUs',
			templateUrl: '../views/aboutUs.html'
		})
		.state('contactUs', {
			url: '/contactUs',
			templateUrl: '../views/contactUs.html'
		})
		.state('faq', {
			abstract: true,
			url: '/faq',
			templateUrl: '../views/faq/faq.html'
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
			templateUrl: '../views/preSignup.html'
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
			templateUrl: '../views/account/account.html'
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

});
