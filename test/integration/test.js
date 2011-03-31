var zombie = require('zombie'),
	assert = require('assert'),
	Subject = require('../../models/subject').Subject;

zombie.visit('http://localhost', {debug: true}, function(err, browser) {
	if (err) {
		console.log(err.message);
	} else {
		var testSubjectName = 'Test subject';
		browser.fill('#newsubject input[type=text]', testSubjectName);
		browser.pressButton("Create New", function(err, browser, status) {
			if (err) console.log(err);
			assertSubjectExists(testSubjectName);
			deleteTestSubjects(testSubjectName);
			// Object .subject:last has no method 'dispatchEvent'
			browser.fire('click', '.subject:last', function() {
				console.log('yaysauce');
			});
		});
		console.log('done');
	}
});

function assertSubjectExists(name) {
	Subject.findOne({'name': name}, function(err, doc) {
		assert.ok(doc);
	});
}

function deleteTestSubjects(name) {
	Subject.find({'name': name}, function(err, docs) {
		for (var i = 0; i < docs.length; i++) {
			docs[i].remove(function(err) {
				if (err) console.log(err);
			});
		}
	});
}