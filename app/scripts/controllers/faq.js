'use strict';
/*jshint multistr: true */

var app = angular.module('HelpersApp');

app.controller('faqCtrl', function($scope, $location, $anchorScroll) {
	$scope.scrollTo = function(page, index){
		$location.hash(page + index);
		$anchorScroll();
	};

	$scope.qEveryone = [
		{
			question: 'What can I do with a Helpers account?',
			answer: 'You are eligible to find a tutor with a Helpers account, and will be able to tuto  once you have edit your "Tutor Account Information" under "Me".'
		},
		{
			question: 'What if one of the user\'s phone ran out of power during a session?',
			answer: 'The session will be automatically charged according to the duration the \
			users have agreed upon. However, having a phone charge to have our app running duing the session \
			is part of being prepared for the session, which could affect users\' own rating.'
		},
		{
			question: 'How does the rating system work?',
			answer: 'Users will have two different ratings, one as students, and another one as tutors. User\'s rating will be shown according to the repsective role in a session.'
		},
		{
			question: 'What if I cancel an appointment?',
			answer: 'will be filled in'
		},
		{
			question: 'How are payments done? Do I need to bring cash?',
			answer: 'All payment is done through our app with the card information provided by both users. There sill be no need for cash transaction.'
		},
		{
			question: 'testing for scrollTo',
			answer: 'blah'
		},
		{
			question: 'testing for scrollTo',
			answer: 'blah'
		},
		{
			question: 'testing for scrollTo',
			answer: 'blah'
		},
		{
			question: 'testing for scrollTo',
			answer: 'blah'
		},
		{
			question: 'testing for scrollTo',
			answer: 'blah'
		},
		{
			question: 'testing for scrollTo',
			answer: 'blah'
		},
		{
			question: 'testing for scrollTo',
			answer: 'blah'
		},
		{
			question: 'testing for scrollTo',
			answer: 'blah'
		}
	];

	$scope.false = 'false';

});