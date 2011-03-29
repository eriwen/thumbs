$(document).ready(function() {
	var subjects = $('.subject');
	subjects.click(function() {
		var self = $(this);
		subjects.removeClass('active');
		self.addClass('active');

		var detail = self.children('.detail').first();
		if (!detail.attr('loaded')) {
			$.get('/subject/' + self.attr('rel'), function(data) {
				detail.append(data);
				detail.children('.addnote').submit(submitNewNote);
			});
			detail.attr('loaded', 'true');
		}
	});
	
	var ratyOptions = {
		path: '../images',
		size: 32,
		click: submitRating,
		width: 280,
		// TODO: custom stars (larger)
		cancelOff: 'cancel-off-big.png',
		cancelOn: 'cancel-on-big.png',
		starHalf: 'star-half-big.png',
		starOff: 'star-off-big.png',
		starOn: 'star-on-big.png'
	};
	
	function submitRating(score, evt) {
		var ratingForm = this.parent('form').first();
		var ratingStars = ratingForm.children('.stars').first();
		var postData = 'score=' + ratingStars.children('input').first().val();
		$.post(ratingForm.attr('action'), postData, function(response) {
			var newRating = $.parseJSON(response).r;
			ratingStars.empty().removeAttr('title').removeAttr('id');
			ratingStars.css({opacity: '0.75'});
			ratingStars.raty($.extend(ratyOptions, {readOnly: true, start: newRating}))
		});
		evt.stopImmediatePropagation();
	}
	
	$('.stars').each(function() {
		$(this).raty(ratyOptions);
	});
	
	function submitNewNote() {
		var self = $(this),
			note = self.children('.note').first();
		postData = 'content=' + note.val();
		$.post(self.attr('action'), postData, function(response) {
			self.siblings('.notes').first().append('<li class="content">' + $.parseJSON(response).n + '</li>');
			note.val('');
		});
		return false;
	}
});