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
		res.render('subject', { title: 'Subjects', subjects: subjects });
	});
};
/*
exports.create = function(req, res) {
	subjects.push({name: req.body.subject.name, notes: []});
	res.redirect('back');
};

exports.read = function(req, res) {
	var subject = subjects[req.params.id];
	res.render('subject/read', {
		title: 'Subject: ' + subject.name,
		subject: subject
	});
};

exports.edit = function(req, res) {
	var subject = subjects[req.params.id];
	res.render('subject/edit', {
		title: 'Editing subject: ' + subject.name,
		subject: subject
	});
};

exports.update = function(req, res) {
	// TODO: validation and DB insert
	var subject = subjects[req.params.id];
	var bd = req.body;
	subject.notes.push({rating: bd.rating, note: bd.note, author: bd.author});
	subject.rating = computeRating(subject);
	res.redirect('back');
};

exports.delete = function(req, res) {
	subjects[req.params.id] = undefined;
	res.redirect('back');
};
*/