$(() => {
	$('.search')
	.keyup( (event) => {
		if (event.keyCode === 13) {
			$('.panel').show();
		}
	});
	$('.search').find('input').on({
		'input': () => {
			$('.panel').hide();
		},
		'blur': (event) => {
			$('.panel').hide();
			$(event.target).val('');
		}
	});
}
);