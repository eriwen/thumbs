var subjects = [
	{name: 'Fred Jean', rating: 9.0, notes: [
		{author: 'Johnny Wey', note: 'Is a genius', rating: 9.0}
	]},
	{name: 'John Doe', rating: 0.0, notes: []}
];

function computeRating(subject) {
	var i = subject.notes.length - 1,
		total = 0.0;
	if (i < 0) {
		return total;
	}
	for(; i >= 0; i--) {
		total += subject.notes[i].rating;
	}
	return total / i;
}

exports.list = function(req, res) {
	res.render('subject', { title: 'Subjects', subjects: subjects });
};

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
	console.log(require('sys').inspect(req.body));
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