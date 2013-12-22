var trackEvent = function(eventAction, eventLabel) {
	_gaq.push(['_trackEvent', 'Homepage', eventAction, eventLabel, 1, false]);
};

var trackDownloads = function() {
	$('.download').on('click', function() {
		trackEvent('Download', 'Download Jan. 13 2013');
	});
};

$(document).ready(function() {
	trackDownloads();
});