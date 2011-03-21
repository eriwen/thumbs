var subjects = [
	{name: 'Fred Jean', rating: 10.0, notes: [
		{author: 'Eric Wendelin', note: 'JRubyist', rating: 3.0},
		{author: 'Johnny Wey', note: 'Is a genius', rating: 9.0},
	]},
	{name: 'John Doe', rating: 5.4}
];

exports.list = function(req, res) {
	res.render('subject', { title: 'Subjects', subjects: subjects });
};

exports.create = function(req, res) {
	subjects.push({name: req.body.name});
	res.redirect('back');
};

exports.read = function(req, res) {
	res.render('subject/read', {
		title: 'Subject: ' + req.subject.name,
		subject: req.subject
	});
};

exports.edit = function(req, res) {
	res.render('subject/edit', {
		title: 'Editing subject: ' + req.subject.name,
		subject: req.subject
	});
};

exports.update = function(req, res) {
	// TODO: validation and DB insert
	var subject = req.body.subject;
	req.subject.name = subject.name;
	res.redirect('back');
};

exports.delete = function(req, res) {
	// TODO: delete subject from subjects
	console.log(req.body);
	// delete subjects[req.body.subject.id];
	res.redirect('back');
};