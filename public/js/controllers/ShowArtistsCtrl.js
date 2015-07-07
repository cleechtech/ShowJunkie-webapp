app.controller('ShowArtists', function($scope, Artist){
	console.log($scope.CURR_USER)

	$scope.followArtist = function(){
		console.log('followArtist in ctrl');
		Artist.follow(1)
	};

});


app.controller('RequestArtistCtrl', function($scope, $http){
	$scope.requestArtist = function(){
		$http({
			url: '/artists/request',
			type: 'GET',
			params: {
				user: $scope.CURR_USER,
				requestedArtist: $scope.requestedArtist
			}
		}).then(function(){
			alert('Thanks for request coverage of ' + $scope.requestedArtist + '! We will look into it');
			$scope.requestedArtist = '';
		});
		
	};
})