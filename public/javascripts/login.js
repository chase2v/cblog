$(function () {
	$('form').submit((event) => {
		let input_u = $(this).find('input[type=text]'),
		input_p = $(this).find('input[type=password]'),
		un = input_u.val(),
		pw = input_p.val();
		un = hex_sha1(un);
		pw = hex_sha1(pw);
		event.preventDefault();

		// 提交验证
		let option = {
			url: '/login',
			method: 'POST',
			data: {
				u: un,
				p: pw
			},
			error: () => {
				$('.block').append('<div class="alert alert-danger" style="margin-top:10px;padding:5px 10px;font-size:1.2rem;">用户名或密码错误！</div>');
			},
			success: () => {
				window.location.href = '/admin';
			}
		}
		$.ajax(option);
	});

	$('input').on('input', () => {
		$('.alert').remove();
	});
});