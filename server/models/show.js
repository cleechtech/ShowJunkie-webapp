var mongoose = require('mongoose');

// show model schema
var showSchema = mongoose.Schema({

    artists: [{ type : mongoose.Schema.ObjectId, ref : 'Artist' }],
    venue: { type : mongoose.Schema.ObjectId, ref : 'Venue' },
    date: { type: Date },
	ticketUrl: { type: String }    

});

module.exports = mongoose.model('Show', showSchema);