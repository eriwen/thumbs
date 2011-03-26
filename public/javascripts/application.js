$(document).ready(function() {
	var subjects = $('.subject');
	
	function clickSubject() {
		var self = $(this);
		subjects.removeClass('active');
		self.addClass('active');

		var detail = self.children('.detail').first();
		if (!detail.attr('loaded')) {
			$.get('/subject/' + self.attr('rel'), function(data) {
				self.children('.detail').append(data);
			});
			detail.attr('loaded', 'true');
		}
	}
	
	subjects.click(clickSubject);
	
	$('.stars').raty({
		half: true,
		path: '../images',
		size: 24,
		click: null,
		cancelOff: 'cancel-off-big.png',
		cancelOn: 'cancel-on-big.png',
		starHalf: 'star-half-big.png',
		starOff: 'star-off-big.png',
		starOn: 'star-on-big.png'
	});
});