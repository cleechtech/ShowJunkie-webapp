var adminApp = angular.module('ShowJunkie.admin', [
	'ui.router',
	'formly',
	'formlyBootstrap'
]);

// admin routing config
adminApp.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('artists', {
			url: '/artists',
			templateUrl: 'admin_static/templates/artists.html',
			controller: 'ArtistsCtrl'
		})
		.state('addArtist', {
			url: '/addArtist',
			templateUrl: 'admin_static/templates/addArtist.html',
			controller: 'AddArtistCtrl'
		})
		.state('shows', {
			url: '/shows',
			templateUrl: 'admin_static/templates/shows.html',
			controller: 'ShowsCtrl'
		})
		.state('addShow', {
			url: '/addShow',
			templateUrl: 'admin_static/templates/addShow.html',
			controller: 'AddShowCtrl',
			resolve: {
				allArtists: function(Artist){
					return Artist.getAll();
				}
			}
		})
		.state('venues', {
			url: '/venues',
			templateUrl: 'admin_static/templates/venues.html',
			controller: 'VenuesCtrl'
		})
		.state('addVenue', {
			url: '/addVenue',
			templateUrl: 'admin_static/templates/addVenue.html',
			controller: 'AddVenueCtrl'
		});
		

	$urlRouterProvider.otherwise('/addArtist');

});

// top controller
adminApp.controller('AdminCtrl', function($scope, $state){
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

		// if they have an image set it
		var artistImage = (typeof artistObj.images[0] === 'undefined')? '': artistObj.images[0].url;

		$scope.artist.name = artistObj.name;
		$scope.artist.images.push(artistImage);
		$scope.artist.spotifyId = artistObj.id;
	};
});

// view artists controller
adminApp.controller('ArtistsCtrl', function($scope, Artist){

	Artist.getAll().then(function(artists){
		$scope.artists = artists;
	});
});

// Shows
adminApp.controller('ShowsCtrl', function($scope, $http){
	$http.get('/api/shows').then(function(res){
		$scope.shows = res.data;
	});
});

adminApp.controller('AddShowCtrl', function($scope, $http, allArtists){
	$scope.newShow = {};

		console.log(allArtists);

	$scope.showFields = [
		{
	        key: 'artists',
	        type: 'select',
	        templateOptions: {
	            label: 'Artists performing',
	            options: allArtists
	        }
	    },
	    {
	        key: 'venue',
	        type: 'select',
	        templateOptions: {
	            label: 'Artists performing',
	            options: allArtists
	        }
	    },
	];

	$scope.addShow = function(newShow){
		$http.post('/api/shows', newShow).then(function(res){
			console.log(res);
		});
	};
});

// Venues
adminApp.controller('VenuesCtrl', function($scope, $http){
	$http.get('/api/venues').then(function(res){
		$scope.venues = res.data;
	});
});

adminApp.controller('AddVenueCtrl', function($scope, $http){
	$scope.newVenue = {};

	$scope.venueFields = [
		 {
            key: 'name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Venue Name',
                placeholder: 'What the place is called',
                required: true
            }
        },
        {
            key: 'address',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Address',
                placeholder: 'Street address',
            }
        },
        {
            key: 'url',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Url',
                placeholder: 'Venue\'s website',
            }
        },
        {
            key: 'zipcode',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Zipcode',
                placeholder: 'zipcode in the bay',
            }
        }
	];

	$scope.addVenue = function(newVenue){
		$http.post('/api/venues', newVenue).then(function(res){
			console.log(res);
		});
	};
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

adminApp.service('Artist', function($http){
	return {
		getAll: function(){
			return $http({
				method: 'get',
				url: '/api/artists'
			}).then(function(res){
				return res.data;
			});
		}
	};
});