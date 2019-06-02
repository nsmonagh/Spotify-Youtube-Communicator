/*let button = document.createElement("button");
button.type = "button";
button.innerHTML = "spotify";
document.querySelector("#menu").appendChild(button);*/
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
  alert(data.title);
});
