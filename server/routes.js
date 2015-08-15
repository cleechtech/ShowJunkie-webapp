var express = require('express'),
	path = require('path'),
	User = require('./models/user'),
	Artist = require('./models/artist'),
	Show = require('./models/show'),
	Venue = require('./models/venue'),
	sendEmail = require('./email/sendEmail'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router();

module.exports = function(app, passport){	

	// home page
	app.get('/', function (req, res){
		if (req.isAuthenticated()){
			res.render('dashboard.ejs', {
				user: req.user
			});
		} else {
			res.render('index.ejs');
		}
	});
	
	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/deleteAccount', function(req, res){
		User.findOneAndRemove(req.user._id, function(err) {
  			if (err) throw err;
			res.redirect('/');
		});
	});

	// admin homepage
	//  for production add isAdmin middleware
	app.get('/admin', function(req, res){
		res.render('admin/layout.ejs');
	});

	// local posts
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',  // could use a callback here (http://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling)
		failureRedirect: '/signup',
		failureFlash: true
	}));

	// Log in with Facebook
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	// Connect facebook account (already logged in)
	app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

	app.get('/connect/facebook/callback', passport.authorize('facebook', {
		successRedirect: '/',
		failureRedirect: '/'
	}));

	// unlink facebook
	app.get('/unlink/facebook', function(req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });


    // Log in with Spotify
    app.get('/auth/spotify', passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'] }));

    app.get('/auth/spotify/callback',
		passport.authenticate('spotify', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

    app.get('/connect/spotify', passport.authorize('spotify', {scope: ['user-read-email', 'user-read-private'] }));

	app.get('/connect/spotify/callback', passport.authorize('spotify', {
		successRedirect: '/',
		failureRedirect: '/'
	}));

	app.get('/unlink/spotify', function(req, res) {
        var user = req.user;
        user.spotify.token = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

	// ARTISTS
	// ========
    // add an artist
    apiRouter.post('/artists', function(req, res){
    	var newArtist = new Artist();
    	console.log(req.body);
    	newArtist.name = req.body.name;
    	newArtist.images.push(req.body.image);

    	newArtist.save(function(a, b){
    		res.redirect('/admin');
    	})
    });

    // get all artists
    apiRouter.get('/artists', function(req, res){
    	Artist.find({}).exec(function(err, artists){
    		console.log(artists);
    		res.send(artists);
    	});
    });

    // get artist
    apiRouter.get('/artists/:id', function(req, res){
    	var id = req.params.id;
    	Artist.find({ _id: id }).exec(function(err, artist){
    		console.log(artist);
    		res.json(artist);
    	});
    });

    // get shows for artist
    apiRouter.get('/artists/:id/shows', function(req, res){
    	var artistId = req.params.id;

    	Show.find({ artists: artistId }).exec(function(err, shows){
    		console.log(shows);
    		res.json(shows);
    	});
    });

    // follow an artist
	// apiRouter.put('/artists/:artistId', function(req, res){
	// 	var user_id = req.query.userId;
	// 	var artist_id = req.params.artistId;

	// 	User.findOne({_id: user_id }, function(err, user){
	// 		user.following.push(artist_id);
	// 	});
	// });

    // artist request
    // app.get('/artists/request', function(req, res){
    // 	var artist_requested = req.query.requestedArtist;
    // 	var requesting_user = req.query.user;

    // 	// send an email to myself about the artist request
    //     sendEmail({
    //       	to: 'connorleech@gmail.com',
    //     	subject: 'artist request: ' + artist_requested,
    //     	html: 'Requested by: ' + requesting_user + '<br><br><br><hr>' + 'Full request: ' + req.query.requestedArtist
    //     }, function(data){
    //     	res.send({message: 'Thank you for your request'});
    //     });
    // });

    // Venues
	// ========
	// add a venue
	apiRouter.post('/venues', function(req, res){
		// make venue object
    	var newVenue = new Venue();
    	newVenue.name = req.body.name;
    	newVenue.address = req.body.address;
    	newVenue.url = req.body.url;
    	newVenue.zipcode = req.body.zipcode;

    	// save to database
    	newVenue.save(function(err, venue){
    		res.json(venue);
    	})
    });

	// get all venues
	apiRouter.get('/venues', function(req, res){
    	Venue.find({}).exec(function(err, venues){
    		console.log(venues);
    		res.json(venues);
    	});
    });

    // get venue
    apiRouter.get('/venues/:id', function(req, res){
    	var id = req.params.id;
    	Venue.find({ _id: id }).exec(function(err, venue){
    		console.log(venue);
    		res.json(venue);
    	});
    });

    // get shows for venue
    apiRouter.get('/venues/:id/shows', function(req, res){
    	var venueId = req.params.id;

    	Show.find({ venue: venueId }).exec(function(err, shows){
    		console.log(shows);
    		res.json(shows);
    	});
    });

	// Shows
	// ========
	// add show
	apiRouter.post('/shows', function(req, res){
    	var newShow = new Show();
    	console.log(req.body);

    	newShow.save(function(a, b){
    		res.redirect('/admin');
    	});
    });

	// get all shows
	apiRouter.get('/shows', function(req, res){
		Show.find({}).exec(function(err, shows){
			console.log(shows);
			res.json(shows);
		});
	});

	// get show
	apiRouter.get('/shows/:id', function(req, res){
		var showId = req.params.id;

		Show.find({ _id: id }).exec(function(err, show){
			console.log(show);
			res.json(show);
		});
	});

	// shows request
    // app.get('/events/request', function(req, res){
    // 	var event_requested = req.query.requestedEvent;
    // 	var requesting_user = req.query.user;

    // 	// send an email to myself about the event request
    //     sendEmail({
    //       	to: 'connorleech@gmail.com',
    //     	subject: 'event request: ' + event_requested,
    //     	html: 'Requested by: ' + requesting_user + '<br><br><br><hr>' + 'Full request: ' + event_requested
    //     }, function(data){
    //     	res.send({message: 'Thank you for your request'});
    //     });
    // });

	app.use('/api', apiRouter);
};

// Middleware
function isLoggedIn(req, res, next){

	if (req.isAuthenticated()){
		next()
	} else {
		res.send({ error: 'not authenticated' });
	}
}

function isAdmin(req, res, next){
	if(typeof req.user === 'undefined'){
		res.send('Go to <a href="/">homepage</a> and login');
		return;
	}

	var email = req.user.local.email || req.user.facebook.email || req.user.spotify.email;

	if(req.isAuthenticated() && email === 'connorleech@gmail.com'){
		next();
	} else {
		res.send('Error not authorized. Go <a href="/">home</a>');
	}
}