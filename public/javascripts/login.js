$(function () {
	$('form').submit(() => {
		let input_u = $(this).find('input[type=text]'),
		input_p = $(this).find('input[type=password]')
		un = input_u.val(),
		pw = input_p.val();
		input_u.css('-webkit-text-security', 'disc')
		debugger
		un = hex_sha1(un);
		pw = hex_sha1(pw);
		input_u.val(un);
		input_p.val(pw)
	});
});