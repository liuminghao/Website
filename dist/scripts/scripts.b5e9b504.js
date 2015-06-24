"use strict";var app=angular.module("HelpersApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ngStorage","ui.router"]);app.run(["$rootScope","$state",function(a,b){a.$state=b,a.apiHost="http://54.172.140.235"}]);var app=angular.module("HelpersApp");app.config(["$stateProvider","$urlRouterProvider","$httpProvider",function(a,b,c){b.otherwise("/home"),a.state("home",{url:"/home",views:{title:{templateUrl:"../views/homeLanding.html"},body:{templateUrl:"../views/homeBody.html"}}}).state("aboutUs",{url:"/aboutUs",views:{title:{template:"About us"},body:{templateUrl:"../views/aboutUs.html"}}}).state("contactUs",{url:"/contactUs",views:{title:{template:"Contact Us"},body:{templateUrl:"../views/contactUs.html"}}}).state("faq",{"abstract":!0,url:"/faq",views:{title:{template:"FAQ"},body:{templateUrl:"../views/faq/faq.html"}}}).state("faq.everyone",{url:"/everyone",templateUrl:"../views/faq/everyone.html"}).state("faq.tutor",{url:"/tutor",templateUrl:"../views/faq/tutor.html"}).state("faq.student",{url:"/student",templateUrl:"../views/faq/student.html"}).state("preSignup",{url:"/preSignup",views:{title:{template:" "},body:{templateUrl:"../views/preSignup.html"}}}).state("signup",{url:"/signup",views:{title:{template:"Signup"},body:{templateUrl:"../views/signup.html"}}}).state("safetyTips",{url:"/safetyTips",views:{title:{template:"Safety Tips"},body:{templateUrl:"../views/footers/safetyTips.html"}}}).state("academicIntegrity",{url:"/academicIntegrity",views:{title:{template:"Academic Integrity"},body:{templateUrl:"../views/footers/academicIntegrity.html"}}}).state("termsOfUse",{url:"/termsOfUse",views:{title:{template:"Terms of Use"},body:{templateUrl:"../views/footers/termsOfUse.html"}}}).state("privacy",{url:"/privacy",views:{title:{template:"Privacy"},body:{templateUrl:"../views/footers/privacy.html"}}}).state("account",{"abstract":!0,url:"/account",views:{title:{template:"My Account"},body:{templateUrl:"../views/account/account.html"}}}).state("account.genInfo",{url:"/genInfo",templateUrl:"../views/account/genInfo.html"}).state("account.transactionHistory",{url:"/transactionHistory",templateUrl:"../views/account/transactionHistory.html"}).state("account.certifications",{url:"/certifications",templateUrl:"../views/account/certifications.html"})}]);var app=angular.module("HelpersApp");app.controller("loginCtrl",["$scope","$state","$rootScope","range","loginApi","user",function(a,b,c,d,e,f){function g(){var b=f.loadUser();b?(a.account=b,a.signedIn=!0):(a.signedIn=!1,a.account=null)}a.loginAttempt=function(c){var d=e.login(c);d.success(function(c){a.signedIn=!0,b.go("account.genInfo"),a.account=f.login(c)}).error(function(b){a.failedLogin(b,c)})},a.failedLogin=function(a,b){b.username_or_email="",b.password="",100101===a.error?alert("Incorrect username and or password"):100103===a.error?alert("Such a user does not exist"):alert("Server error")},a.logOut=function(){a.loginPopup=!1,f.logout(),g(),b.go("home")},a.toggleLogin=function(){a.loginPopup=!a.loginPopup},a.showLogin=function(){return a.loginPopup&&!a.signedIn},g(),a.range=d,a.loginPopup=!1}]);var app=angular.module("HelpersApp");app.factory("Mailchimp",["$resource",function(a){return a("https://us11.api.mailchimp/3.0/lists/680f362ae2/members")}]),app.controller("preSignupCtrl",["$scope","$state","$http","Mailchimp","after",function(a,b,c,d,e){a.bcEmail=function(){"bc.edu"===e("@",a.email)?a.showAvail=!0:a.showNotAvail=!0,a.submitted=!0},a.joinHelpers=function(){b.go("signup")},a.showAvail=!1,a.showNotAvail=!1,a.submitted=!1}]);var app=angular.module("HelpersApp");app.controller("signupCtrl",["$scope","$state","range","registerUserApi","after",function($scope,$state,range,registerUserApi,after){$scope.passValidate=!0,$scope.emailValidate=!0,$scope.bcValidate=!0,$scope.checkValid=function(a){return $scope.checkPass()&&$scope.checkEmail()&&$scope.bcEmail()&&a},$scope.checkPass=function(){return $scope.confirm_password===$scope.newUser.password?$scope.passValidate=!0:$scope.passValidate=!1,$scope.passValidate},$scope.checkEmail=function(){return $scope.confirmEmail===$scope.newUser.email?$scope.emailValidate=!0:$scope.emailValidate=!1,$scope.emailValidate},$scope.bcEmail=function(){return $scope.bcValidate=eval("bc.edu"===after("@",$scope.newUser.email)),!0},$scope.register=function(a,b){if($scope.checkValid(b)){var c=registerUserApi.register(a);c?$state.go("account/genInfo"):console.log("did not signup")}},$scope.range=range}]);var app=angular.module("HelpersApp");app.controller("uploadCtrl",["$scope","fileReader",function(a,b){a.getFile=function(){b.readAsDataUrl(a.file,a).then(function(b){a.imageSrc=b})}}]),app.directive("ngFileSelect",function(){return{link:function(a,b){b.bind("change",function(b){a.file=(b.srcElement||b.target).files[0],a.getFile()})}}}),function(a){var b=function(a,b){var c=function(a,b,c){return function(){c.$apply(function(){b.resolve(a.result)})}},d=function(a,b,c){return function(){c.$apply(function(){b.reject(a.result)})}},e=function(a,b){return function(a){b.$broadcast("fileProgress",{total:a.total,loaded:a.loaded})}},f=function(a,b){var f=new FileReader;return f.onload=c(f,a,b),f.onerror=d(f,a,b),f.onprogress=e(f,b),f},g=function(b,c){var d=a.defer(),e=f(d,c);return e.readAsDataURL(b),d.promise};return{readAsDataUrl:g}};a.factory("fileReader",["$q","$log",b])}(angular.module("HelpersApp"));var app=angular.module("HelpersApp");app.controller("faqCtrl",["$scope","$location","$anchorScroll",function(a,b,c){a.scrollTo=function(a,d){b.hash(a+d),c()},a.qEveryone=[{question:"What's the point of Helpers?",answer:"With a Helpers account, you will be able to find a tutor, and will be able to tutor once you have edited your “Tutor Account Information” under “Me”."},{question:"What if one of our phone runs out of power during a session?",answer:"The timer will still run while your phone is dead. If you turn on your phone before the session finishes, the timer will continue to function with the time while your phone was dead counted in. If you fail to turn on your phone before the predicted time for the end of the session (starting time + duration), the session will be automatically charged according to the duration the users have agreed upon. However, having a phone charged to keep our app running during the session is part of being prepared for the session. The inconvenience you have created to your partner may cause them to give you a bad rating. "},{question:"How does the rating system work?",answer:"Users will have two different ratings: one as a student, and another as a tutor. User’s rating will be shown according to their respective role in a session. Users will start at a 4.5/5 rating as a default rating after creating their account."},{question:"What if I cancel an appointment?",answer:"There will be no penalty for cancellation over a week before the agreed starting time, but cancellation within a week will result in penalty depending on the user’s role in this reservation.  A student’s cancellation will result in a penalty fee, while a tutor’s cancellation will result in the lowering of their rating. Please review our cancellation policy at www.helpers.io/termsOfUse"},{question:"How are payments done? Do I need to bring cash?",answer:"All payment is done through our app with the card information provided by both users. There is no need for cash."}],a.qTutor=[{question:"How do I become a tutor with Helpers?",answer:"After signing up for an account with Helpers, you can go to “Me” and go to “Tutor Account Information” on our app. You may add courses that you would like to tutor in. After that, you are ready to teach! "},{question:"Can I only be a tutor but not a student?",answer:"We designed our app to allow users to be both students and tutors. You can simply ignore the features for students if you only wish to teach."},{question:"Do I have to be certified in order to teach?",answer:"No, you can start teaching once you have added the course in “Tutor account information”, but we strongly encourage you to submit some kind of certification such as a transcript, teacher’s recommendation, or job certification, in order to show students that you are qualified for this job. Also, your rating will increase once you are certified. "},{question:"Why am I not paid everything the student paid?",answer:"A commission fee is paid to Helpers per transaction. We charge a $1.50 commission fee for transactions under $7.50 and a 20% commission fee for transactions above $7.50."},{question:"Why do I need to write in a schedule?",answer:"Once your have put your schedule in our system, only students that you are free to teach will reach out to you."},{question:"How do I find students?",answer:"Once you have set up your profile, students that you can teach will reach out to you. In addition to that, you can always look at “student’s posts” for students who are still looking for tutors. Moreover, you can filter this list by subject that you would like to teach. "},{question:"How do I get paid?",answer:"When you sign up as a tutor you will add your routing information. Venmo and Paypal will also be supported to receive payment."}],a.qStudent=[{question:"How do I become a student with Helpers?",answer:"Simply sign up an account with Helpers and you will be able to find tutors for help."},{question:"How do I ensure the quality of the tutor?",answer:"You can always check if the tutor is certified. There is always a certified symbol if they have submitted a transcript with good grades, a teacher’s recommendation, or a job certification proving quality in tutoring. You can also check their ratings, which reflects their quality from the students’ perspective. If you are still unsure as to the tutor’s quality, you can chat with the tutor before sending out a request."},{question:"Why do I have a rating?",answer:"We have two different rating system, one as a tutor, and another as a student. As a student, you are expected to be prepared for your session, attend to the session on time, give an accurate estimate of the duration for the session, and pay right after the session. Any inconvenience caused by you that a tutor experienced could result in the lowering of your rating by the tutor. Your rating will be seen by tutors when you request them or when you post on “student’s post”. "},{question:"How can I find a tutor I like that I have previously met?",answer:"We currently do not allow this feature, but if you cannot find this tutor when you are searching for a subject, chances are, that tutor is not around at the time and location that you have specified and you should seek for other qualified tutors to help you out."},{question:"How do I pay after a transaction",answer:"You will be asked to input your card information when you sign up. After the session has ended, the card will automatically be charged.  You can always modify that information through “me” in The Helpers App or in My Account on the Helpers website. "}]}]);var app=angular.module("HelpersApp");app.controller("viewCtrl",["$scope","$rootScope","after",function(a,b,c){a.checkPage=function(a){return a===c(".",b.$state.current.name)}}]);var app=angular.module("HelpersApp");app.controller("homeCtrl",["$scope",function(a){a.homePages=[{title:"Whatever",pinImg:"../images/Home/notebook_F.png",centerImg:"../images/Home/whatever.png",forStudents:"Our tutors are certified in a variety of subjects, from music theory to string theory, you name it.",forTutors:"Teach classes you have taken. Follow three steps to get your certifications today!",background:"48, 235, 88"},{title:"Whenever",pinImg:"../images/Home/clock_F.png",centerImg:"../images/Home/whenever.png",forStudents:"You can schedule both instantaneous appointments and in-advance appointments. Learn whenever you want.",forTutors:"You can input your weekly schedule into your profile. Scheduling an appointment never becomes so easy.",background:"48, 235, 191"},{title:"Whoever",pinImg:"../images/Home/ID_card_F.png",centerImg:"../images/Home/whoever.png",forStudents:"You can choose whoever you want to study with, let it be your classmate or your TA.",forTutors:"Meet your fellow classmates and help them with your knowledge. Choose a posted student request to tutor today!",background:"24, 220, 228"},{title:"Wherever",pinImg:"../images/Home/location_F.png",centerImg:"../images/Home/wherever.png",forStudents:"Our pinning feature saves your favorite meeting location. Learn wherever you want.",forTutors:"Hold a quick session at wherever you are. You can sort student requests by location.",background:"48, 150, 235"},{title:"Pricever",pinImg:"../images/Home/dollar_F.png",centerImg:"../images/Home/pricever.png",forStudents:"Our system allows you to find tutors at whatever price. You pay what you want.",forTutors:" You set your own prices for each class you teach.",background:"52, 88, 243"}]}]);var app=angular.module("HelpersApp");app.controller("scrollCtrl",["$scope","$anchorScroll",function(a,b){a.scrollTo=function(a){b(a)}}]);var app=angular.module("HelpersApp");app.controller("accountCtrl",["$scope","updateInfoApi","getInfoApi","user",function(a,b,c,d){function e(){var b=d.loadUser();b&&(a.account=b)}a.updateInfo=function(){var c;c=["DoB","MoB","YoB"];for(var d in c)a.account[d]=a.account.profile[d],delete a.account.profile[d];var e="ApiKey "+a.account.email+":"+a.account.apikey;a.account=b.update(e),console.log(a.account)},a.printInfo=function(){var b="ApiKey "+a.account.email+":"+a.account.apikey;c.print(b)},a.accountPages=[{title:"General Information",source:"genInfo"},{title:"Transaction History",source:"transactionHistory"},{title:"Certifications",source:"certifications"}],e()}]);var app=angular.module("HelpersApp");app.directive("modal",function(){return{template:'<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title centered">{{ title }}</h4></div><div class="modal-body" ng-transclude></div></div></div></div>',restrict:"E",transclude:!0,replace:!0,scope:!0,link:function(a,b,c){a.title=c.title,a.$watch(c.appear,function(a){a===!0?$(b).modal("show"):$(b).modal("hide")}),$(b).on("shown.bs.modal",function(){a.$apply(function(){a.$parent[c.appear]=!0})}),$(b).on("hidden.bs.modal",function(){a.$apply(function(){a.$parent[c.appear]=!1})})}}});var app=angular.module("HelpersApp");app.factory("user",["$localStorage",function(a){var b,c={};return c.login=function(c){return b=c,a.account=b,b},c.loadUser=function(){return"undefined"==typeof a.account||null===a.account?!1:b=a.account},c.logout=function(){return b=null,a.account=b,b},c}]);var app=angular.module("HelpersApp");app.factory("after",function(){return function(a,b){return b.substring(b.indexOf(a)+1)}}),app.factory("before",function(){return function(a,b){return-1===b.indexOf(a)?b:b.substring(0,b.indexOf(a))}}),app.factory("range",function(){return function(a,b){for(var c=[],d=b;d>=a;d--)c.push(d);return c}});var app=angular.module("HelpersApp");app.factory("registerUserApi",["$http",function(a){return{register:function(b){return a({method:"POST",url:"http://54.172.140.235/api/v1/createuser/",headers:{"Content-Type":"application/json"},data:JSON.stringify(b)})}}}]),app.factory("loginApi",["$http",function(a){return{login:function(b){return a({method:"POST",url:"http://54.172.140.235/api/v1/user/login/",headers:{"Content-Type":"application/json"},data:JSON.stringify(b)})}}}]),app.factory("forgotPasswordApi",["$http",function(a){return{forgot:function(b){var c=a({method:"POST",url:"http://54.172.140.235/api/v1/user/password/reset/",headers:{"Content-Type":"application/json"},data:JSON.stringify(b)});c.success(function(){return!0}).error(function(){return!1})}}}]),app.factory("setPasswordApi",["$http",function(a){return{setPassword:function(b,c,d,e){var f=a({method:"POST",url:"http://54.172.140.235/api/v1/user/password/change/",headers:{"Content-Type":"application/json",AUTHORIZATION:e},data:JSON.stringify({oldpassword:b,password1:c,password2:d})});f.success(function(){return!0}).error(function(a){return a})}}}]),app.factory("getInfoApi",["$http",function(a){return{print:function(b){var c=a({method:"GET",url:"http://54.172.140.235/api/v1/user/3/",headers:{"Content-Type":"application/json",AUTHORIZATION:b}});c.success(function(a){return a}).error(function(){console.log("FAILED INFO REQUEST")})}}}]),app.factory("updateInfoApi",["$http",function(a){return{update:function(b,c){var d=a({method:"PUT",url:"http://54.172.140.235/api/v1/user/3/",headers:{"Content-Type":"application/json",AUTHORIZATION:c},data:JSON.stringify(b)});d.success(function(a){return a}).error(function(){console.log("Update error")})}}}]),app.factory("deleteUserApi",["$http",function(a){return{deleteUser:function(b){var c=a({method:"DELETE",url:"http://54.172.140.235/api/v1/user/7/",headers:{"Content-Type":"application/json",AUTHORIZATION:b}});c.success(function(a){return a}).error(function(){console.log("Delete error")})}}}]),app.factory("validationApi",["$http",function(a){return{validate:function(b,c){var d=a({method:"POST",url:"http://54.172.140.235/api/v1/user/digit/",headers:{"Content-Type":"application/json"},data:{email:b,digit:c}});d.success(function(){console.log("You have vertified your account")}).error(function(a){"The email already verified"===a.status?console.log("You have already been vertified"):"Digit expired"===a.status?console.log("Sorry this digit has expired, another email has been sent to your account"):"Invalid digit"===a.status?console.log("Sorry you entered an incorrect digit"):"Invalid digit format, the digit should be a 4 digit number"===a.status?console.log("Please enter a 4 digit number"):console.log("I m afraid I m not sure what went wrong")})}}}]),app.factory("photoApi",["$http",function(a){return{upload:function(b){return a({method:"POST",url:"http://23.23.191.103/api/v1/user/avatarupload/",headers:{"Content-Type":"application/json"},data:b})}}}]);var app=angular.module("HelpersApp");app.filter("capitalize",function(){return function(a){return a?a.replace(/([^\W_]+[^\s-]*) */g,function(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()}):""}});var app=angular.module("HelpersApp");app.filter("camelCase",function(){return function(a,b){if(isNaN(a))for(var c=b||".",d=0;-1!==a.indexOf(c)&&4>d;){var e=a.indexOf(c);a=a.slice(0,e)+a.charAt(e+1).toUpperCase()+a.slice(e+2),d+=1}return a}});