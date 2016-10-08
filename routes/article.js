var express = require('express');
var router = express.Router();
let mysql = require('mysql');

/* GET article page. */
router.get('/:id', function(req, res, next) {

	// 获取文章内容
	getArticle(req.params.id).then(rt => {
		console.log(rt);
		res.render('./pages/article', { title: 'Cheney3w | ' + rt.title, article: rt });
	}, err=>console.log(err))

});

let getArticle = (id) => {
	return new Promise((resolve, reject) => {
		let connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'blog'
		});

		connection.connect();

		connection.query('SELECT id, title, time, article FROM article WHERE id=' + id, (err, rows, fields) => {
			if (err) reject(err);

			rows.forEach(v => {
				v.time = v.time.toLocaleDateString();
			});
			resolve(rows[0]);
		});

		connection.end();
	});
}

module.exports = router;