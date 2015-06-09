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

	$scope.qTutor = [
		{
			question: 'How do I become a tutor with Helpers?',
			answer: 'After signing up for an account with Helpers you can go to "Me" and go to "Tutor Account Information." You may add courses that you would like to tutor. After that, you are eligible to teach!'
		},
		{
			question: 'Can I only be a tutor but not a student?',
			answer: 'We designed our app to allow users to be both students and tutors. You can just ignore the features for students if you only wish to teach.'
		},
		{
			question: 'Do I have to be certified in order to teach?',
			answer: 'No, you can start teaching once you have added the course.'
		},
		{
			question: 'What if I cancel an appointment?',
			answer: ' '
		},
		{
			question: 'How are payments done? Do I need to bring cash?',
			answer: 'All payment is done through our app with the card information provided by both users. There sill be no need for cash transaction.'
		}
	];

	$scope.qStudent = [
		{
			question: 'How do I become a student with Helpers?',
			answer: 'Simply sign up an account with Helpers and you will be able to find tutors for help.'
		},
		{
			question: 'How do I ensure the quality of the tutor?',
			answer: 'You can always check if the tutor is certified. There is always a certified symbol if they have subimitted credentials to tutor. You can also check their ratings, which reflect comments from previous students. If you are still unsure, you can message the tutor before sending out a request.'
		},
		{
			question: 'Why do I have a rating?',
			answer: 'Your rating is based upon the tutors opinion on you, which reflects how prepared you were for this session and if you'
		},
		{
			question: 'How can I find a tutor I like that I have previously met?',
			answer: 'We currently do not allow this feature, but if you cannot find this tutor when you are searching for a subject, chances are, that tutor is not around at the time and location that you have specified and you should seek for other qualified tutors to help you out.'
		}
	];

});