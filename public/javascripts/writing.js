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
			$('input.timepicker').hide();
			$('input.datepicker').hide();
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
			$('input.timepicker').show();
			$('input.datepicker').show();
			$('.fullscreen')
				.find('span')
				.addClass('glyphicon-resize-full')
				.removeClass('glyphicon-resize-small');
			state = 0;
		}
	});
	$('.datepicker').pickadate();
	$('.timepicker').pickatime();

	$('.datepicker').on('change',  (event) => {
		console.log( $(this).val() );
		console.log( $('.timepicker').val() );
	});

	$('.submit').click( () => {
		let article = $('#preview').html().replace(/\n|\r/g, ''),
		preview = $('#preview').text().replace(/\n|\r/g, '').slice(0, 25);
		let options = {
			url: '/admin/writing/submit/save',
			method: 'POST',
			data: {
				date: new Date($('.datepicker').val() + ' ' + $('.timepicker').val()).toLocaleString(),
				title: $('.article-title').val(),
				content: article,
				preview: preview
			},
			error: (e) => {
				console.log(e);
			},
			success: (msg) => {
				debugger
				if (msg === 'OK') {
					$('.writing').append(`<div class="alert alert-success" style="width:50%;margin-top:10px;padding:5px 10px;font-size:1.2rem;">保存成功！</div>`);
				}
				setTimeout(()=>{
					window.location.reload();
				}, 2000);
			}
		}
		$.ajax(options);
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