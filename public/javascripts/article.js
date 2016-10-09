$(function () {
	window.onscroll = (event) => {
		let st = document.body.scrollTop;
		if(st >= 60) {
			$('.header')
				.addClass('header-hide')
				.find('.logo').text('C')
				.end().find('.menu-bar a').eq(2).siblings().hide();
		} else if (st < 60) {
			$('.header')
				.removeClass('header-hide')
				.find('.logo').text('Cheney3w')
				.end().find('.menu-bar a').eq(2).siblings().show();
		}
		if (st >= 800) {
			$('.return').show();
		} else if (st < 800) {
			$('.return').hide();
		}
	}
	$('.return').click(function () {
		let interval = setInterval(()=>{
			document.body.scrollTop -= document.body.scrollTop / 12;
			if (document.body.scrollTop < 5) {
				document.body.scrollTop = 0;
				clearInterval(interval);
			}
		}, 20);
	});
});