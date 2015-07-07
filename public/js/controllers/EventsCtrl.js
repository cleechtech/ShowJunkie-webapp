app.controller('EventsCtrl', function($scope){

});

app.controller('RequestEventCtrl', function($scope, $http){
	$scope.requestedEvent = {};

	$scope.requestEvent = function(){
		console.log()
		if($scope.requestedEvent.name === '' || typeof($scope.requestedEvent.name) === 'undefined'){
			alert("We at least need a name for who you want to add!");
			return;
		}

		$http({
			url: '/events/request',
			type: 'GET',
			params: {
				user: $scope.CURR_USER,
				requestedEvent: $scope.requestedEvent
			}
		}).then(function(){
			alert('Thanks for telling us about ' + $scope.requestedEvent.name + '! We will look into adding it');
			$scope.requestedEvent = {};
		});
		
	};
});