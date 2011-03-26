var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

// Subject can have 0..n Notes
var Note = new Schema({
	author: String,
	content: String
});

var Subject = new Schema({
	name: {type: String, default: '', required: true},
	rating: {type: Number, default: 0, min: 0, max: 5},
	notes: [Note],
	archived: {type: Boolean, default: false}
});
  
mongoose.model('Subject', Subject);
var Subject = exports.Subject = mongoose.model('Subject');
