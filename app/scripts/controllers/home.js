'use strict';
/*jshint multistr: true */

var app = angular.module('HelpersApp');

app.controller('homeCtrl', function($scope) {

  $scope.homePages = [
    {
      title: 'Whatever',
      pinImg: '../images/Home/notebook_F.png',
      forStudents: 'Our tutors are certified in a variety of subjects, from music theory to string theory, you name' +
      ' it.',
      forTutors: 'Teach classes you have taken. Follow three steps to get your certifications today!',
      background: '48, 235, 88'
    },
    {
      title: 'Whenever',
      pinImg: '../images/Home/clock_F.png',
      forStudents: 'You can schedule both instantaneous appointments and in-advance appointments. Learn whenever you' +
      ' want.',
      forTutors: 'You can input your weekly schedule into your profile. Scheduling an appointment never becomes so' +
      ' easy.',
      background: '48, 235, 191'
    },
    {
      title: 'Whoever',
      pinImg: '../images/Home/ID_card_F.png',
      forStudents: 'You can choose whoever you want to study with, let it be your classmate or your TA.',
      forTutors: 'Meet your fellow classmates and help them with your knowledge. Choose a posted student request to' +
      ' tutor today!',
      background: '24, 220, 228'
    },
    {
      title: 'Wherever',
      pinImg: '../images/Home/location_F.png',
      forStudents: 'Our pinning feature saves your favorite meeting location. Learn wherever you want.',
      forTutors: 'Hold a quick session at wherever you are. You can sort student requests by location.',
      background: '48, 150, 235'
    },
    {
      title: 'Pricever',
      pinImg: '../images/Home/dollar_F.png',
      forStudents: 'Our system allows you to find tutors at whatever price. You pay what you want.',
      forTutors: ' You set your own prices for each class you teach.',
      background: '52, 88, 243'
    }
  ];

});
