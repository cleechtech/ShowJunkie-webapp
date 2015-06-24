
app.factory('Notified', function(FIREBASE_URL, $firebaseArray, Auth){
	// events
	var ref = new Firebase(FIREBASE_URL + 'events');
	var events = $firebaseArray(ref);

	// following
	var ref = new Firebase(FIREBASE_URL + 'following/');
    var following = $firebaseArray(ref);
    var curr_email = Auth.getCurrentUser().password.email;

	return {
		getFollowingArtists: function(){
			var followingArtists = {};

			// wait until following array has loaded
		    return following.$loaded().then(function(res){

		      // go through all followers for every artist
		      angular.forEach(following, function(artistFollowers){
		        var artist = artistFollowers.$id;

		        for(var key in artistFollowers){
		          if(curr_email === artistFollowers[key]){
		            // if current user is following an artist show it on the page
		            followingArtists[artist] = true;
		          }
		          
		        }
		      });

		      return followingArtists;
		    }).then(function(res){
		    	// return object of true/false for artists user is following
		    	return res;
		    });
		},
		getEventsForArtists: function(followList){
			var events_for_current_user = [];

			// if user is following an artist, get that artist's events
			return events.$loaded().then(function(allEvents){

				allEvents.forEach(function(e){
					var artists = e.artists;	// artists performing at this event
				
					artists.forEach(function(a){
						// if the artist is in our follow list, add the event
						if(typeof(followList[a.name]) !== 'undefined' && followList[a.name]){
							
							// only add unique events
							if(events_for_current_user.indexOf(e) === -1){
								events_for_current_user.push(e);
							}
							
						}
					})

				});

				return events_for_current_user;
			}).then(function(res){
				return res;
			});

		}
	};
});
