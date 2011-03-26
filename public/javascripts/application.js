$(document).ready(function() {
	var subjects = $('.subject');
	
	subjects.click(function() {
		var self = $(this);
		subjects.removeClass('active');
		self.addClass('active');
		$.get('/subject/' + self.attr('rel'), function(data) {
			self.append(data);
			// TODO: rewrite function to just close
		});
	});	
});