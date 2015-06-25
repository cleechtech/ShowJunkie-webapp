

app.controller('MainCtrl', function($scope, $rootScope, Artist, User, Auth, Follows, Notified, toaster) {

    $scope.artists = Artist.allArtists;

    // create object with artist name as key, value as true/false if following
    Notified.getFollowingArtists().then(function(artistUserFollows){
      $scope.followingArtists = artistUserFollows;
    });

    var curr_email = Auth.getCurrentUser().password.email;

    $scope.updateFollowing = function(artistName){
      Notified.getFollowingArtists()
        .then(function(artistUserFollows){
          
          // toggle scope map
          $scope.followingArtists = artistUserFollows;
          $scope.followingArtists[artistName] = !artistUserFollows[artistName];

          // toggle in firebase
          if(artistUserFollows[artistName]){
            Follows.followArtist(artistName, curr_email);
          } else {
            Follows.unfollowArtist(artistName, curr_email);
          }

          // update event count
          Notified.getEventsForArtists(artistUserFollows).then(function(events_for_user){
            $rootScope.myEvents = events_for_user;
            var old_count = $rootScope.count;
            $rootScope.count = events_for_user.length;

            // toaster pop for new events
            if(old_count !== 0 && $rootScope.count > old_count){
              var newEvents = $rootScope.count - old_count;
              toaster.pop('info', "You have " + newEvents + " more upcoming shows", "");

            }

          })
        });
    };

    $scope.feedLimit = 10;
    $scope.increaseFeed = function(){
      $scope.feedLimit += 10;

      if($scope.artists.length <= $scope.feedLimit){
        $scope.feedLimit = $scope.artists.length;
      }
      
    };
});

