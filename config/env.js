// configure environments
//========================
var path = require('path'),
	rootPath = path.normalize(__dirname + '/../');

module.exports = {
	development: {
		db: 'mongodb://localhost/showjunkie', // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
		rootPath: rootPath,
		baseUrl: 'http://localhost:3000',
		port: process.env.PORT || 3000
	},
	test: {},
	production: {
		db: process.env.MONGOLAB_URI || 'mongolab_uri',
		rootPath: rootPath,
		baseUrl: 'https://showjunkie.herokuapp.com',
		port: process.env.PORT || 3000
	}
};