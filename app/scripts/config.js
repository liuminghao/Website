'use strict';

var app = angular.module('HelpersApp');

app.config( function($stateProvider, $urlRouterProvider) {
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

});
