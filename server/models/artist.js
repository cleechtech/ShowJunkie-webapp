var mongoose = require('mongoose');
var User = require('./user');

// artist model schema
var artistSchema = mongoose.Schema({

    name: String,
    followers: [User.schema],

});

module.exports = mongoose.model('Artist', artistSchema);
