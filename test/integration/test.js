var zombie = require('zombie'),
	assert = require('assert'),
	Subject = require('../../models/subject').Subject;

zombie.visit('http://localhost', {debug: true}, runTest);

function runTest(err, browser) {
	if (err) browser.log(err);
	else {
		createNewSubject(browser, assertSubjectExists);
		browser.wait(clickSubject);
		browser.wait(rate);
		browser.wait(addNote);
		browser.wait(deleteTestSubjects);
	}
}

function createNewSubject(browser, callback) {
	browser.log('createNewSubject()');
	browser.fill('#newsubject input[type="text"]', 'Test subject');
	browser.pressButton('Create New', callback);
	browser.log('end createNewSubject()');
}

function assertSubjectExists(err, browser) {
	browser.log('assertSubjectExists()');
	Subject.findOne({'name': 'Test subject'}, function(err, doc) {
		assert.ok(doc);
	});
	browser.log('end assertSubjectExists()');
}

function clickSubject(err, browser) {
	browser.log('clickSubject()');
	if (err) browser.log(err);
	browser.clickLink('click', browser.querySelector('.subject:last a'), verifyOpenSubject);
	browser.log('end clickSubject()');
}

function verifyOpenSubject(err, browser, status) {
	browser.log('verifyOpenSubject()');
	if (err) browser.log(err);
	browser.log('status ' + status);
	assert.equal(browser.text('title'), 'Test subject');
	browser.log('end verifyOpenSubject()');
}

function rate(err, browser) {
	browser.log('rate()');
	if (err) browser.log(err);
	browser.wait(function(err, browser) {
		browser.log('html ' + browser.html());
		browser.fire('click', browser.querySelector('.stars img:last'), verifyRating);
	});
	browser.log('end rate()');
}

function verifyRating(err, browser) {
	browser.log('verifyRating()');
	if (err) browser.log(err);
	var ratingInput = browser.querySelector('.stars input[type="hidden"]');
	assert.equal(ratingInput.getAttribute('value'), '5');
	browser.log('end verifyRating()');
}

function addNote(err, browser) {
	browser.log('addNote()');
	if (err) browser.log(err);
	browser.wait(function(err, browser) {
		if (err) browser.log(err);
		browser.fill('.addnote .note', 'test note');
		browser.pressButton('Add Note', verifyNewNote);
	});
	browser.log('end addNote()');
}

function verifyNewNote(err, browser) {
	browser.log('verifyNewNote()');
	if (err) browser.log(err);
	var newNote = browser.querySelector('.notes li');
	assert.equal(newNote.innerHTML, 'test note');
	browser.log('end verifyNewNote()');
}

function deleteTestSubjects(err, browser) {
	browser.log('deleteTestSubjects()');
	Subject.find({'name': 'Test subject'}, function(err, docs) {
		for (var i = 0; i < docs.length; i++) {
			docs[i].remove(function(err) {
				if (err) browser.log(err);
			});
		}
	});
	browser.log('end deleteTestSubjects()');
}