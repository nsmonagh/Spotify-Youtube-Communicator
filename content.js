function makeButton(jNode) {
  $("<input type='image' src='https://vast-hamlet-63420.herokuapp.com/images/spotify.png'/>").click(function() {
    console.log("hello world!!");
  }).appendTo(jNode);
}

waitForKeyElements('#menu > ytd-menu-renderer', makeButton);

let video_id = window.location.search.split('v=')[1];
let ampersandPosition = video_id.indexOf('&');
if (ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}

let url = 'https://www.youtube.com/watch?v=' + video_id;
$.getJSON('https://noembed.com/embed', {
  format: 'json',
  url: url
}, function(data) {
  console.log(data.title);
});

$.getJSON('https://api.spotify.com/v1/search?q=track%3Anumb+artist%3Alinkin+park&type=track',
  function(data) {
    console.log(data);
  });
