
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
        .state('addArtist', {
            url: '/artists/add',
            templateUrl: 'templates/addArtist.html',
            controller: 'RequestArtistCtrl'
        });;
});