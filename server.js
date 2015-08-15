
var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	validator = require('express-validator'),
	cookieParser = require('cookie-parser'),
	engine = require('ejs-mate'),
	flash = require('connect-flash'),
	passport = require('passport'),
	session = require('express-session')
    methodOverride = require('method-override'),
	cors = require('cors'),
	app = express();

// ENVIRONMENT CONFIG
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	envConfig = require('./config/env')[env];

// DATABASE
mongoose.connect(envConfig.db);
require('./server/models/artist');
require('./server/models/venue');
require('./server/models/show');

// PASSPORT config
require('./config/passport')(passport);

// EXPRESS CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(session({ secret: 'thisisverys3crett', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
require('./server/routes')(app, passport);

// Start server
app.listen(envConfig.port, function(){
  console.log('Server listening on port ' + envConfig.port)
});