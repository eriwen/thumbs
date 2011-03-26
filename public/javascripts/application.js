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
		this.parent('form').first().submit();
		// TODO: show rating
		// TODO: make this rating read-only
	}
	
	var ratyOptions = {
		path: '../images',
		size: 32,
		click: submitRating,
		width: 310,
		// TODO: custom stars (larger)
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