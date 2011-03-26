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
	
	function submitRating() {
		var self = $(this);
		debugger;
		// $.post('/subject/' + self.parent('') + '/rate', '')
		// TODO: prevent duplicate votes
		// TODO: show rating
		// TODO: make this rating read-only
	}
	
	var ratyOptions = {
		half: true,
		path: '../images',
		size: 24,
		click: submitRating,
		width: 170,
		cancelOff: 'cancel-off-big.png',
		cancelOn: 'cancel-on-big.png',
		starHalf: 'star-half-big.png',
		starOff: 'star-off-big.png',
		starOn: 'star-on-big.png'
	};
	
	$('.stars').each(function() {
		$(this).raty(ratyOptions);
	});
});