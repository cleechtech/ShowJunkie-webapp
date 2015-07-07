var mongoose = require('mongoose');
var User = require('./user');

// artist model schema
var artistSchema = mongoose.Schema({

    name: String,
    followers: [mongoose.Schema.ObjectId],
    images: [String]

});

module.exports = mongoose.model('Artist', artistSchema);
