
app.controller('SettingsCtrl', function($scope, Auth, toaster, $state){

	$scope.changePassword = function(oldPassword, newPassword){
		var current_user = Auth.getCurrentUser();

		Auth.authRef.$changePassword({
			email: current_user.password.email,
			oldPassword: oldPassword,
			newPassword: newPassword
		}).then(function() {
			toaster.pop('success', "Password changed successfully!", "");
			$scope.oldPassword = '';
			$scope.newPassword = '';
		}).catch(function(error) {
			toaster.pop('error', "Did not change password", "Please try again");
			$scope.oldPassword = '';
			$scope.newPassword = '';
		});
	};
})
