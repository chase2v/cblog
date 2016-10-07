jQuery.noConflict();
jQuery(function ($) {
	let state = 0;
	$('.fullscreen').click( ()=> {
		if (!state) {
			$('.left').animate({
				left: '-20%'
			}, 1000);
			$('.right').removeClass('col-lg-offset-2 col-lg-10');
			$('.writing').addClass('writing-fullscreen');
			$('.submit').hide();
			$('.fullscreen')
				.find('span')
				.removeClass('glyphicon-resize-full')
				.addClass('glyphicon-resize-small');
			state = 1;
		} else {
			$('.left').animate({
				left: 0
			}, 1000);
			$('.right').addClass('col-lg-offset-2 col-lg-10');
			$('.writing').removeClass('writing-fullscreen');
			$('.submit').show();
			$('.fullscreen')
				.find('span')
				.addClass('glyphicon-resize-full')
				.removeClass('glyphicon-resize-small');
			state = 0;
		}
	});
});

function Editor(input, preview) {
  this.update = function () {
    preview.innerHTML = markdown.toHTML(input.value);
  };
  input.editor = this;
  this.update();
}
var $ = function (id) { return document.getElementById(id); };
var editor = new Editor($("text-input"), $("preview"));
$('text-input').addEventListener('input', editor.update);