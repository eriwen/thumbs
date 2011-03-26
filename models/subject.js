var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId,

// Subject can have 0..n Notes
var Note = new Schema({
	author: {type: String, default: '', required: true},
	rating: {type: Number, default: 0, required: true},
	note: {type: String, default: ''}
});

mongoose.model('Note', Note);
var Note = exports.Note = mongoose.model('Note');

var Subject = new Schema({
	name: {type: String, default: '', required: true},
	rating: {type: Number, default: 0},
	notes: [Note]
});
  
mongoose.model('Subject', Subject);
var Subject = exports.Subject = mongoose.model('Subject');
