'use strict';

var app = angular.module('HelpersApp');

app.config( function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home/landing');
	//$locationProvider.html5Mode(true);

	$stateProvider

		.state('home', {
			abstract: true,
			url: '/home',
			templateUrl: '../views/home/home.html',
			css: '../styles/home.css'
		})
				.state('home.landing', {
					url: '/landing',
					templateUrl: '../views/home/landing.html',
					css: '../styles/home.css'
				})
				.state('home.whatever', {
					url: '/whatever',
					templateUrl: '../views/home/whatever.html',
					css: '../styles/home.css'
				})
				.state('home.whenever', {
					url: '/whenever',
					templateUrl: '../views/home/whenever.html',
					css: '../styles/home.css'
				})
				.state('home.whoever', {
					url: '/whoever',
					templateUrl: '../views/home/whoever.html',
					css: '../styles/home.css'
				})
				.state('home.wherever', {
					url: '/wherever',
					templateUrl: '../views/home/wherever.html',
					css: '../styles/home.css'
				})
				.state('home.moneyEver', {
					url: '/moneyEver',
					templateUrl: '../views/home/moneyEver.html',
					css: '../styles/home.css'
				})											
		.state('aboutUs', {
			abstract: true,
			url: '/aboutUs',
			templateUrl: '../views/aboutUs/aboutUs.html',
			css: '../styles/aboutUs.css'
		})
				.state('aboutUs.ourStory', {
					url: '/ourStory',
					templateUrl: '../views/aboutUs/ourStory.html',
					css: '../styles/aboutUs.css'
				})
				.state('aboutUs.ourVision', {
					url: '/ourVision',
					templateUrl: '../views/aboutUs/ourVision.html',
					css: '../styles/aboutUs.css'
				})
		.state('contactUs', {
			abstract: true,
			url: '/contactUs',
			templateUrl: '../views/contactUs/contactUs.html',
			css: '../styles/contactUs.css'
		})
				.state('contactUs.press', {
					url: '/press',
					templateUrl: '../views/contactUs/press.html',
					css: '../styles/contactUs.css'
				})
				.state('contactUs.joinUs', {
					url: '/joinUs',
					templateUrl: '../views/contactUs/joinUs.html',
					css: '../styles/contactUs.css'
				})
		.state('faq', {
			abstract: true,
			url: '/faq',
			templateUrl: '../views/faq/faq.html',
			css: '../styles/faq.css'
		})
				.state('faq.everyone', {
					url: '/everyone',
					templateUrl: '../views/faq/everyone.html',
					css: '../styles/faq.css'
				})
				.state('faq.tutor', {
					url: '/tutor',
					templateUrl: '../views/faq/tutor.html',
					css: '../styles/faq.css'
				})
				.state('faq.student', {
					url: '/student',
					templateUrl: '../views/faq/student.html',
					css: '../styles/faq.css'
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
					templateUrl: '../views/footers/safetyTips.html',
					css: '../styles/footers.css'
				})
				.state('academicIntegrity', {
					url: '/academicIntegrity',
					templateUrl: '../views/footers/academicIntegrity.html',
					css: '../styles/footers.css'
				})
				.state('termsOfUse', {
					url: '/termsOfUse',
					templateUrl: '../views/footers/termsOfUse.html',
					css: '../styles/footers.css'
				})
				.state('privacy', {
					url: '/privacy',
					templateUrl: '../views/footers/privacy.html',
					css: '../styles/footers.css'
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
