app.factory('Artist', function($http, CURR_USER){

	return {
		follow: function(artistId){
			console.log('follow artist factory')
			return $http({
				method: 'PUT',
				url: '/api/artists/' + artistId,
				params: {
					userId: CURR_USER._id
				}
			}).then(function(res){
				console.log(res)
				return res.data;
			});
		}
	};
});