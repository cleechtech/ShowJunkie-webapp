
var app = angular.module('ShowJunkie', [
	'ui.router',
	'ui.bootstrap',
	'ngCookies'
]);

// app.run(function(){
//     console.log(user);
// })

app.config(function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'templates/dashboard.html'
        })
        .state('artists', {
            url: '/artists',
            templateUrl: 'templates/artists.html',
            controller: 'ShowArtists'
        })
        .state('events', {
            url: '/events',
            templateUrl: 'templates/events.html',
            controller: 'EventsCtrl'
        })
        .state('addArtist', {
            url: '/artists/request',
            templateUrl: 'templates/requestArtist.html',
            controller: 'RequestArtistCtrl'
        })
        .state('addEvent', {
            url: '/events/request',
            templateUrl: 'templates/requestEvent.html',
            controller: 'RequestEventCtrl'
        });
});