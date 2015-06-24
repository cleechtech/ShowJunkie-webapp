
app.factory('Follows', function(FIREBASE_URL, $firebaseArray){

	return {
		followArtist: function(artistName, curr_email){
			var artistFollowRef = new Firebase(FIREBASE_URL + 'following/' + artistName);
			var artistFollowing = $firebaseArray(artistFollowRef);

        	artistFollowing.$add(curr_email);
		},
		unfollowArtist: function(artistName, curr_email){
			var artistFollowRef = new Firebase(FIREBASE_URL + 'following/' + artistName);
			var artistFollowing = $firebaseArray(artistFollowRef);

			artistFollowing
				.$loaded()
				.then(function(follower){
	        		for(var key in follower){
	            		if(follower[key].$value === curr_email){
	              			// remove email from follow list
	              			artistFollowing.$remove(follower[key]);
	            		}
	          		}
        		});
		}
	};
});