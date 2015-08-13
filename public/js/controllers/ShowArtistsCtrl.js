app.controller('ShowArtists', function($scope, Artist){
	console.log($scope.CURR_USER)

	$scope.followArtist = function(){
		console.log('followArtist in ctrl');
		Artist.follow(1)
	};

});


app.controller('RequestArtistCtrl', function($scope, $http){
	$scope.requestArtist = {};

	$scope.requestArtist = function(){
		if($scope.requestedArtist.name === '' || typeof($scope.requestedArtist.name) === 'undefined'){
			alert("We at least need a name for who you want to add!");
			return;
		}

		$http({
			url: '/artists/request',
			type: 'GET',
			params: {
				user: $scope.CURR_USER,
				requestedArtist: $scope.requestedArtist
			}
		}).then(function(){
			alert('Thanks for request coverage of ' + $scope.requestedArtist.name + '! We will look into it');
			$scope.requestedArtist = {};
		});
		
	};
});