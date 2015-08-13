// get shows from Jambase API v3
// http://developer.jambase.com/

var request = require('request');
var moment = require('moment-timezone');

// Jambase variables
var JAMBASE_KEY = 'eztf82krjqbdevfuc2d98gse';
var JAMBASE_EVENTS_URL = 'http://api.jambase.com/events';
var zipcode = '94607';
var radius = 25;
var startDate = moment().utc().tz('America/Los_Angeles').format("YYYY-MM-DDTHH:mm:ss");

var getShows = function(zipcode, radius, startDate){
	request({
	    url: JAMBASE_EVENTS_URL,
	    qs: {
	    	api_key: JAMBASE_KEY,
	    	zipcode: zipcode,
	    	radius: radius,
	    	startDate: startDate
	    },
	    method: 'GET'
	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        console.log(response.statusCode, body);
	    }
	});
};

getShows(zipcode, radius, startDate);


module.exports = getShows;