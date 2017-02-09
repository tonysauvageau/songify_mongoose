var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Song = new Schema({
    title: String,
    description: String,
    artist: String,
    updatedAt: Date
});

module.exports = mongoose.model('Song', Song);