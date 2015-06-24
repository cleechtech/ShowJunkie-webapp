var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/mean-starter',
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGOLAB_URI || 'mongodb://heroku_wsg0g233:80q4gh8in9ub56gk9e2ega596a@ds037087.mongolab.com:37087/heroku_wsg0g233',
		port: process.env.PORT || 80
	}
};