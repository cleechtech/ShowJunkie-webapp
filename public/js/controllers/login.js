
app.controller('LoginCtrl', function($scope, Auth, $state, User, toaster){
	$scope.user = {};

	if(Auth.getCurrentUser() !== null){
		// user is already logged in
		$state.go('home');
	}

	$scope.login = function(){
		Auth.loginUserIn($scope.user)
			.then(function(){
				// successful login
				$state.go('home');
			}, function(error){
				$scope.error = error.toString();
			});
	};

	$scope.register = function(){

		// register login credentials
		Auth.registerNewUser($scope.user).then(function(simpleLogin){

			if(simpleLogin.code === 'EMAIL_TAKEN'){
				alert('Already account for that email. Try logging in');
				$state.go('login');
				return;
			}

			var newUser = angular.copy($scope.user);

			// delete password for storage in users
			delete newUser.password;

			// store uid to match to authentication
			newUser = angular.extend(newUser, simpleLogin);

			// add user object to users
			User.add(newUser).then(function(ref){
				var id = ref.key();
				var currentUser = User.get(id);

				Auth.loginUserIn({email: $scope.user.email, password: $scope.user.password })
					.then(function(){
						// success creating user and logging in
						$state.go('home');
					})
					.catch(function(err){
						$scope.error = err;
						console.error('Error logging in: ' + err);
					});

			}).catch(function(err){
				console.log('Error logging in: ' + err);
			});
			
		});
		
	};

	$scope.logout = function(){
		Auth.logout();
		$state.go('login');
	};


	$scope.resetPassword = function(email){
		Auth.resetPassword(email).then(function(){
			toaster.pop('success', "Your password has been reset", "Check your email");
   			$state.go('login');
		}, function(){
			toaster.pop('error', "Something went wrong", "Please try again");
			$state.go('login');
		});
	};

});


