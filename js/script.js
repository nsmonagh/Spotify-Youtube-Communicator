// Injects the Spotify button
function makeButton(jNode) {
  let imgURL = chrome.extension.getURL('images/spotify32.png');
  $("<input type='image' src=" + imgURL + ">").click(function() {
    console.log("hello world!!");
  }).appendTo(jNode);
}

// Specifies where to inject the Spotify button
waitForKeyElements('div.ytd-video-primary-info-renderer[id=info]', makeButton);

// Gets the id of the current video
let video_id = window.location.search.split('v=')[1];
let ampersandPosition = video_id.indexOf('&');
if (ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}

// Gets the title of the current video using the video id
let url = 'https://www.youtube.com/watch?v=' + video_id;
$.getJSON('https://noembed.com/embed', {
  format: 'json',
  url: url
}, function(data) {
  console.log(data.title);
});

//let spotifyApi = new SpotifyWebApi();

//spotifyApi.setAccessToken();

//spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
//  console.log('Artist albums', data);
//});

/*function postData(input) {
  $.ajax({
    type: "POST",
    url: chrome.extension.getURL('script.py'),
    data: {
      param: input
    },
    success: callbackFunc
  });
}

function callbackFunc(response) {
  // do something with the response
  console.log(response);
}*/