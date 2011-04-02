var zombie = require('zombie'),
	assert = require('assert'),
	Subject = require('../../models/subject').Subject;

zombie.visit('http://localhost', {debug: true}, runTest);

function runTest(err, browser) {
	if (err) browser.log(err);
	else {
		createNewSubject(browser, assertSubjectExists);
		browser.wait(rate);
		browser.wait(clickSubject);
		browser.wait(addNote);
		browser.wait(deleteTestSubjects);
	}
}

function createNewSubject(browser, callback) {
	browser.fill('#newsubject input[type="text"]', 'Test subject');
	browser.pressButton('Create New', callback);
}

function assertSubjectExists(err, browser) {
	Subject.findOne({'name': 'Test subject'}, function(err, doc) {
		assert.ok(doc);
	});
}

function rate(err, browser) {
	if (err) browser.log(err);
	browser.fire('click', browser.querySelector('.subject:last div.stars img:last'), verifyRating);
}

function verifyRating(err, browser) {
	if (err) browser.log(err);
	var ratingInput = browser.querySelector('.subject:last div.stars input[type="hidden"]');
	assert.equal(ratingInput.getAttribute('value'), '5');
}

function clickSubject(err, browser) {
	if (err) browser.log(err);
	browser.fire('click', browser.querySelector('.subject:last'), verifyOpenSubject);
}

function verifyOpenSubject(err, browser) {
	if (err) browser.log(err);
	var detail = browser.querySelector('.subject:last .detail');
	assert.equal(detail.getAttribute('loaded'), 'true');
}

function addNote(err, browser) {
	if (err) browser.log(err);
	browser.wait(function(err, browser) {
		if (err) browser.log(err);
		browser.fill('.subject:last .addnote .note', 'test note');
		browser.pressButton('Add Note', verifyNewNote);
	});
}

function verifyNewNote(err, browser) {
	if (err) browser.log(err);
	var newNote = browser.querySelector('.subject:last .notes li');
	assert.equal(newNote.innerHTML, 'test note');
}

function deleteTestSubjects(err, browser) {
	Subject.find({'name': 'Test subject'}, function(err, docs) {
		for (var i = 0; i < docs.length; i++) {
			docs[i].remove(function(err) {
				if (err) browser.log(err);
			});
		}
	});
}