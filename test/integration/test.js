var zombie = require('zombie'),
	assert = require('assert');

zombie.visit('http://localhost', {debug: true}, function(err, browser) {
	if (err) {
		console.log(err.message);
	} else {
		console.log(browser.html());
	}
});