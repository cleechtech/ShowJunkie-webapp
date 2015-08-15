var mongoose = require('mongoose');

// artist model schema
var venueSchema = mongoose.Schema({

	name: { type: String, required: true },
	address: { type: String },
	latitude: { type: String },
	longitude: { type: String },
	url: { type: String },
	zipcode: { type: String, required: true },
	state: { type: String },
	city: { type: String }

});

module.exports = mongoose.model('Venue', venueSchema);