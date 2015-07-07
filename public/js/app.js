
var app = angular.module('ShowJunkie', [
	'ui.router',
	'ui.bootstrap',
	'ngCookies'
]);

app.config(function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/dashboard.html'
        })
        .state('tables', {
            url: '/tables',
            templateUrl: 'templates/tables.html'
        });
});