(function() {
    var activateTheDownloadButton = function(downloadUrl) {
        var $button = $('.js-download-button');

        // in case the function is called before the document is ready, repeat the call again in a few milliseconds
        if (document.readyState !== 'interactive') {
            return window.setTimeout(function() {
                activateTheDownloadButton(downloadUrl);
            }, 100);
        }

        $button.attr('href', downloadUrl)
               .removeClass('button-disabled');
    };

    // find the download link in the latest release on GitHub
    $.getJSON('https://api.github.com/repos/ArtemGordinsky/Spotifree/releases/latest')
        .done(function(releaseObject) {
            var downloadLinkFound = false;

            $(releaseObject.assets).each(function() {
                if (this.name === 'Spotifree.dmg') {
                    activateTheDownloadButton(this.browser_download_url);
                    downloadLinkFound = true;
                    return false;
                }
            });

            if (!downloadLinkFound) {
                alert('Sorry, could not retrieve the download link. Reload the page to try again.');
            }
        })
        .fail(function() {
            alert('Sorry, could not retrieve the download link. Reload the page to try again.');
        });
})();