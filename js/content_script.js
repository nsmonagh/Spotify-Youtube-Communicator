// Injects the Spotify button
function makeButton(jNode) {
  let imgURL = chrome.extension.getURL('images/gray_spotify32.png');
  $("<input id='6481696ad23546e193ce05408a344d7c' type='image' src=" + imgURL + ">").appendTo(jNode);
  initializeExtension();
}

// Specifies where to inject the Spotify button
waitForKeyElements('div.ytd-video-primary-info-renderer[id=info]', makeButton);

// Initialize client-side JS wrapper for the Spotify Web API
let spotifyApi = new SpotifyWebApi();


function initializeExtension() {
  // Set access token
  $.get(
    "https://thodogantu.pythonanywhere.com/auth",
    function (data) {
      spotifyApi.setAccessToken(data);
      // Call function to get URL
      getSpotifyURL();
    }
  );
}

// Gets URL of music featured in video
function getSpotifyURL() {
  // Gets the id of the current video
  let video_id = window.location.search.split('v=')[1];
  if (typeof video_id == 'undefined')
    return;
  let ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }

  // Get song and artist
  $.get(
    "https://thodogantu.pythonanywhere.com/access/" + video_id,
    function (data) {
      let result = data.split(' - ');

      if (result[0] == 'NullArtist')
        return;

      // Get URL
      spotifyApi.searchTracks(result[1] + ' artist:"' + result[0] + '"')
        .then(function (data) {
          let button = document.getElementById('6481696ad23546e193ce05408a344d7c');
          button.src = chrome.extension.getURL('images/spotify32.png');
          $('#6481696ad23546e193ce05408a344d7c').off('click').on('click', function () {
            try {
              window.open(data.tracks.items[0].external_urls.spotify);
            } catch (error) {
              button.src = chrome.extension.getURL('images/gray_spotify32.png');
            }
          })
        });
    }
  );
}

// Update button based on page change
let oldURL = document.URL;

// window.setInterval takes a function and executes it after 
// a given time (defined by the second parmeter)in miliseconds
let urlChangeHandler = window.setInterval(checkURLChange, 500);

// Check if URL changed
function checkURLChange() {
  newURL = document.URL;
  if (newURL !== oldURL) {
    let button = document.getElementById('6481696ad23546e193ce05408a344d7c');
    button.src = chrome.extension.getURL('images/gray_spotify32.png');
    $('#6481696ad23546e193ce05408a344d7c').off('click');
    getSpotifyURL();
    oldURL = newURL;
  }
}
