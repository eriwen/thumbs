var Subject = require('../models/subject').Subject;

function computeRating(subject) {
	var len = subject.notes.length,
		total = 0.0;
	if (len == 0) {
		return total;
	}
	for(var i = 0; i < len; i++) {
		total += subject.notes[i].rating;
	}
	return total / len;
}

exports.list = function(req, res) {
	Subject.find({}, function(err, objs) {
		res.render('subject', { title: 'Thumbs', subjects: objs });
	});
};

exports.create = function(req, res) {
	var subject = new Subject(req.body.subject);
	subject.save(function(err) {
		console.log('Created new subject');
	});
	res.redirect('back');
};

exports.read = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		res.partial('subject/read', {
			title: 'Subject: ' + subject.name,
			subject: subject
		});
	});
};

exports.rate = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		// TODO: get all ratings and average
		// subject.notes.push(req.body.note);
		// subject.rating = computeRating(subject);
		subject.save(function(err) {
			console.log(err);
		});
	});
	// TODO: return JSON containing rating
};

exports.note = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		var bd = req.body;
		subject.notes.push({content: bd.note});
		subject.save(function(err) {
			console.log(err);
		});
	});
	res.redirect('back');
};

exports.delete = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		subject.remove(function(err) {
			console.log("Deleted subject");
		});
	});
	res.redirect('back');
};
