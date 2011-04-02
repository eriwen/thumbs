var zombie = require('zombie'),
	assert = require('assert'),
	Subject = require('../../models/subject').Subject;

zombie.visit('http://localhost', {debug: true}, runTest);

function runTest(err, browser) {
	if (err) browser.log(err);
	else createNewSubject(browser);
}

function createNewSubject(browser) {
	browser.fill('#newsubject input[type=text]', 'Test subject');
	browser.pressButton('Create New', verifyNewSubjectAndAddNote);
}

function verifyNewSubjectAndAddNote(err, browser, status) {
	if (err) browser.log(err);
	assertSubjectExists('Test subject');
	browser.fire('click', browser.querySelector('.subject:last div.stars img:last'), verifyRating);
	browser.wait(function addNoteCallback() {
		browser.fire('click', browser.querySelector('.subject:last'), fillAndSubmitAddNoteForm);
	});
}

function assertSubjectExists(name) {
	Subject.findOne({'name': name}, function(err, doc) {
		assert.ok(doc);
	});
}

function verifyRating(err, browser) {
	var ratingInput = browser.querySelector('.subject:last div.stars input[type="hidden"]');
	assert.equal(ratingInput.getAttribute('value'), '5');
}

function fillAndSubmitAddNoteForm(err, browser) {
	if (err) browser.log(err);
	browser.wait(function(err, browser) {
		browser.log(browser.html('.subject:last'));
		deleteTestSubjects('Test subject');
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