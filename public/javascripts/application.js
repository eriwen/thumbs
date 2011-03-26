$(document).ready(function() {
	var subjects = $('.subject');
	
	function clickSubject() {
		var self = $(this);
		subjects.removeClass('active');
		self.addClass('active');

		$.get('/subject/' + self.attr('rel'), function(data) {
			self.children('.detail').append(data);
		});
		
		clickSubject = function() {
			var self = $(this);
			subjects.removeClass('active');
			self.addClass('active');
		}
	}
	
	subjects.click(clickSubject);
});