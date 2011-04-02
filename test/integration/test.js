var zombie = require('zombie'),
	assert = require('assert'),
	Subject = require('../../models/subject').Subject;

zombie.visit('http://localhost', {debug: true}, function(err, browser) {
	if (err) {
		browser.log(err);
	} else {
		var testSubjectName = 'Test subject';
		browser.fill('#newsubject input[type=text]', testSubjectName);
		browser.pressButton("Create New", function(err, browser, status) {
			if (err) browser.log(err);
			assertSubjectExists(testSubjectName);
			var newSubject = browser.querySelector('.subject:last');
			browser.fire('click', newSubject, function() {
				browser.log('yaysauce');
				browser.log(browser.html('.subject:last'));
			});
			deleteTestSubjects(testSubjectName);
		});
		browser.log('done');
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
				if (err) browser.log(err);
			});
		}
	});
}