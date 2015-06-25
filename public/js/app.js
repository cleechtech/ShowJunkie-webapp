
var app = angular.module('showjunkie', [
	'ui.router',
	'firebase',
	'ngAnimate',
	'ui.bootstrap',
	'toaster'
]);

app.constant('FIREBASE_URL', 'https://showjunkie.firebaseio.com/');

app.run(function($rootScope, $state){
	// set event count
	$rootScope.myEvents = [];
	$rootScope.count = 0;

	// protect routes, redirect to login page
	$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
		// catch the error thrown by the $requireAuth promise (a $stateChangeError)
		if (error === "AUTH_REQUIRED") {
		  $state.go("login");
		}
	});
})
app.config(function($stateProvider, $urlRouterProvider){

	// client side routes
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "templates/main.html",
			controller: 'MainCtrl',
			resolve: {
		        // controller will not be loaded until $requireAuth resolves
		        // Auth refers to our $firebaseAuth wrapper in the example above
		        "currentAuth": function(Auth, $rootScope){
		        	$rootScope.getCurrentUser = Auth.getCurrentUser;
		        	return Auth.authRef.$requireAuth();
		        }
		      }
		})
		.state('notified', {
		url: "/notified",
			templateUrl: "templates/notified.html",
			controller: 'notifiedCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'templates/login.html',
			controller: 'LoginCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'templates/register.html',
			controller: 'LoginCtrl'
		})
		.state('resetPassword', {
			url: '/resetPassword',
			templateUrl: 'templates/resetPassword.html',
			controller: 'LoginCtrl'
		})
		.state('settings', {
			url: '/settings',
			templateUrl: 'templates/settings.html',
			controller: 'SettingsCtrl'
		});

	$urlRouterProvider.otherwise("/register");
});