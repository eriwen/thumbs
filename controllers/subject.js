var Subject = require('../models/subject').Subject;

function _computeRating(ratings) {
	var len = ratings.length,
		total = 0.0;
	if (len == 0) {
		return total;
	}
	for(var i = 0; i < len; i++) {
		total += ratings[i];
	}
	return total / len;
}

exports.list = function(req, res) {
	Subject.find({}, function(err, docs) {
		res.render('subject', { 
			title: 'Thumbs',
			subjects: docs
		});
	});
};

exports.create = function(req, res) {
	var subject = new Subject(req.body.subject);
	subject.save(function(err) {
		if (err) console.log(err);
	});
	res.redirect('back');
};

exports.read = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		if (err) console.log(err);
		res.render('subject/read', {
			title: subject.name,
			subject: subject
		});
	});
};

exports.rate = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		subject.ratings.push(parseFloat(req.body.score));
		subject.rating = _computeRating(subject.ratings);
		subject.save(function(err) {
			if (err) console.log(err);
		});
		res.send('{"r":' + subject.rating + '}');
	});
	// TODO: store state in localStorage or something
};

exports.computeRating = _computeRating;

exports.note = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		subject.notes.push(req.body.content);
		subject.save(function(err) {
			if (err) console.log(err);
		});
		res.send('{"n":"' + req.body.content + '"}');
	});
};

exports.invite = function(req, res) {
	// TODO: send email
	console.log(req.body);
	res.redirect('back');
};

exports.archive = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		subject.archived = true;
		subject.save(function(err) {
			if (err) console.log(err);
		});
	});
	res.redirect('/');
};

exports.delete = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		subject.remove(function(err) {
			if (err) console.log(err);
		});
	});
	res.redirect('/');
};
