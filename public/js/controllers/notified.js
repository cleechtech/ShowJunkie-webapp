app.controller('notifiedCtrl', function ($scope, Notified, $rootScope){

	Notified.getFollowingArtists().then(function(followList){
		console.log(followList)
		Notified.getEventsForArtists(followList).then(function(events_for_user){
			$rootScope.myEvents = events_for_user;
			console.log(events_for_user)
			$rootScope.count = events_for_user.length;
		})
	});
	// Show more counter
	$scope.feedLimit = 10;
	$scope.increaseFeed = function(){
		$scope.feedLimit += 10;

		if($scope.feedLimit >= $rootScope.myEvents.length){
			$scope.feedLimit = $rootScope.myEvents.length;
		}
	};

	$scope.learnMore = function (url) {
		window.open(url, '_blank');
	};

});