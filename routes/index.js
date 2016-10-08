var express = require('express');
var router = express.Router();
let qs = require('querystring');
let mysql = require('mysql');


// 缓存获取的数据
let data;

/* GET home page. */
router.get('/', (req, res, next) => {
	// console.log(data);
	// console.log(req.query.page)
	// console.log(req.signedCookies);

	if (!req.query.page) {
		res.redirect('/?page=1');
	}

	let connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'blog'
	});

	connection.connect();

	connection.query('SELECT u, p FROM admin', (err, rows, fields) => {
		if (err) console.log(err);

		let user = rows[0];

		// 查询数据
		queryData().then((rt)=>{
			let articles = rt,
			page = req.query.page,
			pn = Math.ceil(articles.length / 10);
			articles = articles.slice((page-1)*10, page*10);

			if (page === '1') {
				if (pn <= 1) {
					pn = 0;
				} else {
					pn = 1;
				}
			} else if (pn === parseInt(page)) {
				pn = 2;
			} else {
				pn = page;
			}

			// 验证用户
			let isLogin = 0;
			if (req.signedCookies.u === user.u && req.signedCookies.p === user.p) {
				isLogin = 1;
			}

			data = {
				title: 'Blog',
				isLogin: isLogin,
				page: pn,
				articles: articles
			}
			
			res.render('index', data);
		},(err)=>{
			console.log(err);
		});
	});

	connection.end();
});

let queryData = () => {
	return new Promise((resolve, reject) => {
		let connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'blog'
		});

		connection.connect();

		connection.query('SELECT id, title, time, preview FROM article', (err, rows, fields) => {
			if (err) reject(err);

			rows.forEach(v => {
				v.time = v.time.toLocaleDateString();
			});

			resolve(rows);
		});

		connection.end();
	});
}

module.exports = router;
