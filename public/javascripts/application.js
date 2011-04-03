$(document).ready(function() {
	var ratyOptions = {
		path: '../images',
		size: 32,
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
	
	$('form.subject .stars').each(function() {
		var self = $(this);
		self.raty($.extend(ratyOptions, {click: submitRating}));
	});
	
	$('#subjects .stars').each(function() {
		var self = $(this);
		self.raty($.extend(ratyOptions, {start: self.attr('rel'), readOnly: true}));
	});
	
	function submitNewNote() {
		var self = $(this);
		postData = 'content=' + self.children('.note').first().val();
		$.post(self.attr('action'), postData, appendNewNote);
		return false;
	}
	
	function appendNewNote(response) {
		$('.notes').first().append('<li class="content">' + $.parseJSON(response).n + '</li>');
		$('.addnote .note').val('');
	}
	
	$('form.addnote').submit(submitNewNote);
});