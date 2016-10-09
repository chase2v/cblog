$(()=>{
	$('.deleteBtn').click(function () {
		let id = '';
		id = $(this).parent().find('.id').text();
		let options = {
			url: '/delete/article/' + id,
			method: 'DELETE',
			error: (e) => {
				$('.articles').append('<div class="alert alert-danger" style="margin-top:10px;padding:5px 10px;font-size:1.2rem;">删除失败！</div>');
			},
			success: (res) => {
				$('.articles').append(`<div class="alert alert-success" style="margin-top:10px;padding:5px 10px;font-size:1.2rem;">删除成功！你删除了${res}篇文章</div>`);
				setTimeout(()=>{
					window.location.reload();
					// $('.alert-success').eq(0).remove();
				}, 2000);
			}
		}
		$.ajax(options);
	});
});