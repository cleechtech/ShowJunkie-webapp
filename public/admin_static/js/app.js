var adminApp = angular.module('ShowJunkie.admin', [
	'ui.router'
]);

// admin routing config
adminApp.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('addArtist', {
			url: '/addArtist',
			templateUrl: 'admin_static/templates/addArtist.html',
			controller: 'AddArtistCtrl'
		})
		.state('addEvent', {
			url: '/addEvent',
			templateUrl: 'admin_static/templates/addEvent.html',
			controller: 'AddEventCtrl'
		})
		.state('artists', {
			url: '/artists',
			templateUrl: 'admin_static/templates/artists.html',
			controller: 'ArtistsCtrl'
		})
		.state('events', {
			url: '/events',
			templateUrl: 'admin_static/templates/events.html',
			controller: 'EventsCtrl'
		});

	$urlRouterProvider.otherwise('/addArtist');

});

// top controller
adminApp.controller('AdminCtrl', function($scope, $state){
	console.log($state)
	$scope.active = $state;
	$scope.isActive = function(viewLocation){
		var active = (viewLocation === $state.current.name);
		return active;
	};
});

// add artists controller
adminApp.controller('AddArtistCtrl', function($scope, Spotify){
	$scope.artist = {
		name: '',
		images: [],
		spotifyId: ''
	};

	$scope.requestSpotify = function(artistName){
		Spotify.getArtistDetails(artistName).then(function(res){
			$scope.searchResults = res;
		});
	};

	$scope.populateFields = function(artistObj){
		$scope.artist.name = artistObj.name;
		$scope.artist.images.push(artistObj.images[0].url);
		$scope.artist.spotifyId = artistObj.id;
	};
});

adminApp.controller('AddEventCtrl', function($scope){

});

// view artists controller
adminApp.controller('ArtistsCtrl', function($scope){

});

// view events controller
adminApp.controller('EventsCtrl', function($scope){

});

// get data from Spotify
adminApp.service('Spotify', function($http){
	return {
		getArtistDetails: function(artist){
			return $http({
				method: 'get',
				url: 'https://api.spotify.com/v1/search',
				params: {
					q: artist,
					type: 'artist'
				}
			}).then(function(res){
				return res.data.artists;
			})
		}
	};
});