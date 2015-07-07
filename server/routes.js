var express = require('express'),
	path = require('path'),
	User = require('./models/user'),
	sendEmail = require('./email/sendEmail'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router();

module.exports = function(app, passport){	

	app.get('/', isLoggedIn);
	
	app.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user: req.user	// get user from session, pass to template
		});
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

    // artist request
    app.get('/artists/request', function(req, res){
    	var artist_requested = req.query.requestedArtist;
    	var requesting_user = req.query.user;

    	// send an email to myself about the artist request
        sendEmail({
          	to: 'connorleech@gmail.com',
        	subject: 'SHOWJUNKIE request: ' + artist_requested,
        	html: 'Requested by: ' + JSON.stringify(requesting_user)
        }, function(data){
        	console.log(data);
        	res.send({message: 'Thank you for your request'});
        });
        
    });

	// follow an artist
	apiRouter.put('/artists/:artistId', function(req, res){
		var user_id = req.query.userId;
		var artist_id = req.params.artistId;

		User.findOne({_id: user_id }, function(err, user){
			user.following.push(artist_id);
		});
	});
	app.use('/api', apiRouter);
};

function isLoggedIn(req, res, next){

	if (req.isAuthenticated()){
		return res.render('dashboard.ejs', {
			user: req.user
		});
	} else {
		return res.render('index.ejs');
	}
}