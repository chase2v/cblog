$(function () {
	window.onscroll = (event) => {
		if(document.body.scrollTop >= 60) {
			$('.header')
				.addClass('header-hide')
				.find('.logo').text('C')
				.end().find('.menu-bar a').eq(2).siblings().hide();
		} else if (document.body.scrollTop < 60) {
			$('.header')
				.removeClass('header-hide')
				.find('.logo').text('Cheney3w')
				.end().find('.menu-bar a').eq(2).siblings().show();
		}
	}	
});