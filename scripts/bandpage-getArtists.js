// Bandpage API
var BANDPAGE_APP_ID = '494579970362953728';
var BANDPAGE_API_KEY = '5ae045d8e3c6bca7c294682592177c69';
var BANDPAGE_API_SECRET = '055837ad8400b7db8ece409058e7d1e3';
var BANDPAGE_BASE = 'https://api-read.bandpage.com/';

var request = require('request');

var kelly_clarkson_bid = '12334995322703872';

// get bandpage token
request({
	url: BANDPAGE_BASE + 'token',
	'auth':{
		'user': BANDPAGE_API_KEY,
		'pass': BANDPAGE_API_SECRET
	},
	qs: {
		client_id: BANDPAGE_API_KEY,
		grant_type: 'client_credentials'
	},
	method: 'post'
}, function(err, res, body){
	if(err){
		console.log(err);
		return;
	}
	var ACCESS_TOKEN = JSON.parse(body)['access_token'];

	// request data on kelly clarkson (chyaaa)
	request({
		url: BANDPAGE_BASE + kelly_clarkson_bid,
		qs: {
			access_token: ACCESS_TOKEN
		}
	}, function(err2, res2, body2){
		if(err2){
			console.log(err2);
			return;
		}

		// {"error":"Permission denied","errors":[{"code":null,"message":"Permission denied"}]}
		console.log(body2);	

	});

});