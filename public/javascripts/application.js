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
});