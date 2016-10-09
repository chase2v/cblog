var express = require('express');
var router = express.Router();
let mysql = require('mysql');

/* GET writing page. */
router.get('/', function(req, res, next) {
	getList().then(data => {
		data.forEach(v => {
			v.time = v.time.toLocaleString();
		});
		res.render('./pages/articles', { title: 'Cheney3w | articles', data: data });
	}, err => {
		console.log(err);
	});
	
});

const getList = () => {
	return new Promise((resolve, reject) => {
		let connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'blog'
		});

		connection.connect();

		connection.query('select id,title, time, (select count(*) from comment where article.id = comment.article_id) as ct from article group by 1', (err, rows, fields) => {
			if (err) reject(err);
			if (rows) resolve(rows);
		});

		connection.end();
	});
}

module.exports = router;