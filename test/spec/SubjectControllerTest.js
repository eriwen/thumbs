var controller = require('../../controllers/subject');

describe('Subject', function() {
	beforeEach(function() {
		spyOn(controller, 'list');
	});
	
	it('should average ratings', function() {
		expect(controller.computeRating([1,3,2,5,4])).toEqual(3);
	});
});