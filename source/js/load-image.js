
var images = ['charlotte'];
var imageIndex = 0;
function loadImage () {
  if(imageIndex >= images.length) return;
  var img = images[imageIndex];
  var activeClass = (imageIndex === 0) ? 'class="active"' : '';
  $('.bg').append('<img '+activeClass+' src="img/bg/'+img+'.jpg" onload="loadImage();">');
  imageIndex++;
}
