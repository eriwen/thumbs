var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId,
	Note = require('./note').Note;

var Subject = new Schema({
	name: {type: String, default: '', required: true},
	rating: {type: Number, default: 0},
	notes: [Note]
});
  
mongoose.model('Subject', Subject);
var Subject = exports.Subject = mongoose.model('Subject');
