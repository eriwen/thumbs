var Subject = require('../models/subject').Subject;

function computeRating(ratings) {
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
	Subject.find({}, function(err, objs) {
		res.render('subject', { 
			title: 'Thumbs',
			subjects: objs
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
		res.partial('subject/read', {
			title: 'Subject: ' + subject.name,
			subject: subject
		});
	});
};

exports.rate = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		subject.ratings.push(parseFloat(req.body.score));
		subject.rating = computeRating(subject.ratings);
		subject.save(function(err) {
			if (err) console.log(err);
		});
		res.send('{r:' + subject.rating + '}');
	});
	// TODO: handle this case
};

exports.note = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		subject.notes.push(req.body.content);
		subject.save(function(err) {
			if (err) console.log(err);
		});
	});
	res.redirect('back');
};

exports.delete = function(req, res) {
	Subject.findOne({_id: req.params.id}, function(err, subject) {
		subject.remove(function(err) {
			if (err) console.log(err);
		});
	});
	res.redirect('back');
};
