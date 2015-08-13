
app.controller('DashboardCtrl', function($scope){
	$scope.usersCount = $http.get('/api/users')
});