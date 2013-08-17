var trackEvent = function(eventAction, eventLabel) {
	_gaq.push(['_trackEvent', 'Homepage', eventAction, eventLabel, 1, false]);
}

var trackDownloads = function() {
	$('.download').on('click', function() {
		trackEvent('Download', 'Download Jan. 13 2013');
	});
}

var trackGiftCardClicks = function() {
	$('a.giftCardLink').on('click', function() {
		trackEvent('Gift card click', 'Maximus ref link click');
	});
}


$(document).ready(function() {
	trackDownloads();
	trackGiftCardClicks();
});