var zombie = require('zombie'),
	assert = require('assert'),
	Subject = require('../../models/subject').Subject;

zombie.visit('http://localhost', {debug: true}, createSubject);

function createSubject(err, browser) {
	browser.fill('#newsubject input[type="text"]', 'Test subject');
	browser.pressButton('Create New', function(err, browser) { browser.wait(clickSubject); });
}

function clickSubject(err, browser) {
	assert.equal(browser.text('.subject:last-child span.name'), 'Test subject');
	browser.clickLink('.subject:last-child a', function(err, browser) { browser.wait(rate);	});
}

function rate(err, browser) {
	assert.equal(browser.text('title'), 'Test subject');
	browser.fire('click', browser.querySelector('.stars img:last'), function verifyRating(err, browser) {
		assert.equal(browser.querySelector('.stars input[type="hidden"]').getAttribute('value'), '5');
	});
	browser.wait(addNote);
}

function addNote(err, browser) {
	browser.fill('.addnote .note', 'test note');
	browser.pressButton('Add Note', function verifyNewNote(err, browser) {
		assert.equal(browser.text('.notes li'), 'test note');
		browser.wait(deleteSubject);
	});
}

function deleteSubject(err, browser) {
	browser.clickLink('Delete', function verifySubjectNotExists(err, browser) {
		browser.wait(function(err, browser) {
			browser.log('done');
		});
	});
}