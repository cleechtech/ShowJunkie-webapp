var env = process.env.NODE_ENV || 'development',
	envConfig = require('./env')[env];

module.exports ={
	"facebookAuth": {
		"clientID": "958743297517139",
		"clientSecret": "0af3d3f155a8a1d4411c95c0b2dc683e",
		"callbackURL": envConfig.baseUrl + "/auth/facebook/callback"
	},
	"spotifyAuth": {
		"clientID": "e8ed9aacf23b48e088d27ba4945f6e4e",
		"clientSecret": "8af11cc93e30441c9807ae9419007ecf",
		"callbackURL": envConfig.baseUrl + "/auth/spotify/callback"
	}
};
