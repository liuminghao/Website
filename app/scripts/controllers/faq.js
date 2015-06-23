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
			question: 'What\'s the point of Helpers?',
			answer: 'With a Helpers account, you will be able to find a tutor, and will be able to tutor once you have edited your “Tutor Account Information” under “Me”.'
		},
		{
			question: 'What if one of our phone runs out of power during a session?',
			answer: 'The timer will still run while your phone is dead. If you turn on your phone before the session finishes, the timer will continue to function with the time while your phone was dead counted in. If you fail to turn on your phone before the predicted time for the end of the session (starting time + duration), the session will be automatically charged according to the duration the users have agreed upon. However, having a phone charged to keep our app running during the session is part of being prepared for the session. The inconvenience you have created to your partner may cause them to give you a bad rating. '
		},
		{
			question: 'How does the rating system work?',
			answer: 'Users will have two different ratings: one as a student, and another as a tutor. User’s rating will be shown according to their respective role in a session. Users will start at a 4.5/5 rating as a default rating after creating their account.'
		},
		{
			question: 'What if I cancel an appointment?',
			answer: 'There will be no penalty for cancellation over a week before the agreed starting time, but cancellation within a week will result in penalty depending on the user’s role in this reservation.  A student’s cancellation will result in a penalty fee, while a tutor’s cancellation will result in the lowering of their rating. Please review our cancellation policy at www.helpers.io/termsOfUse'
		},
		{
			question: 'How are payments done? Do I need to bring cash?',
			answer: 'All payment is done through our app with the card information provided by both users. There is no need for cash.'
		}
	];

	$scope.qTutor = [
		{
			question: 'How do I become a tutor with Helpers?',
			answer: 'After signing up for an account with Helpers, you can go to “Me” and go to “Tutor Account Information” on our app. You may add courses that you would like to tutor in. After that, you are ready to teach! '
		},
		{
			question: 'Can I only be a tutor but not a student?',
			answer: 'We designed our app to allow users to be both students and tutors. You can simply ignore the features for students if you only wish to teach.'
		},
		{
			question: 'Do I have to be certified in order to teach?',
			answer: 'No, you can start teaching once you have added the course in “Tutor account information”, but we strongly encourage you to submit some kind of certification such as a transcript, teacher’s recommendation, or job certification, in order to show students that you are qualified for this job. Also, your rating will increase once you are certified. '
		},
		{
			question: 'Why am I not paid everything the student paid?',
			answer: 'A commission fee is paid to Helpers per transaction. We charge a $1.50 commission fee for transactions under $7.50 and a 20% commission fee for transactions above $7.50.'
		},
		{
			question: 'Why do I need to write in a schedule?',
			answer: 'Once your have put your schedule in our system, only students that you are free to teach will reach out to you.'
		},
    {
      question: 'How do I find students?',
      answer: 'Once you have set up your profile, students that you can teach will reach out to you. In addition to that, you can always look at “student’s posts” for students who are still looking for tutors. Moreover, you can filter this list by subject that you would like to teach. '
    },
    {
      question: 'How do I get paid?',
      answer: 'When you sign up as a tutor you will add your routing information. Venmo and Paypal will also be' +
      ' supported to receive payment.'
    }
	];

	$scope.qStudent = [
		{
			question: 'How do I become a student with Helpers?',
			answer: 'Simply sign up an account with Helpers and you will be able to find tutors for help.'
		},
		{
			question: 'How do I ensure the quality of the tutor?',
			answer: 'You can always check if the tutor is certified. There is always a certified symbol if they have submitted a transcript with good grades, a teacher’s recommendation, or a job certification proving quality in tutoring. You can also check their ratings, which reflects their quality from the students’ perspective. If you are still unsure as to the tutor’s quality, you can chat with the tutor before sending out a request.'
		},
		{
			question: 'Why do I have a rating?',
			answer: 'We have two different rating system, one as a tutor, and another as a student. As a student, you are expected to be prepared for your session, attend to the session on time, give an accurate estimate of the duration for the session, and pay right after the session. Any inconvenience caused by you that a tutor experienced could result in the lowering of your rating by the tutor. Your rating will be seen by tutors when you request them or when you post on “student’s post”. '
		},
		{
			question: 'How can I find a tutor I like that I have previously met?',
			answer: 'We currently do not allow this feature, but if you cannot find this tutor when you are searching for a subject, chances are, that tutor is not around at the time and location that you have specified and you should seek for other qualified tutors to help you out.'
		},
    {
      question: 'How do I pay after a transaction',
      answer: 'You will be asked to input your card information when you sign up. After the session has ended, the card will automatically be charged.  You can always modify that information through “me” in The Helpers App or in My Account on the Helpers website. '
    }
	];

});
