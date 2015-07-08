var adminApp = angular.module('ShowJunkie.admin', []);

adminApp.controller('AdminCtrl', function($scope, Spotify){
	$scope.requestSpotify = function(artistName){
		console.log(artistName)
		Spotify.getArtistDetails(artistName).then(function(res){
			console.log(res);
			$scope.searchResults = res;
		})
	}
});

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