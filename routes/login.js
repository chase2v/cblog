var express = require('express');
var router = express.Router();
let mysql = require('mysql');

/* GET login page. */
router.get('/', function(req, res, next) {
	res.render('./pages/login', { title: 'Login' });
});

router.post('/', function (req, res, next) {
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

		if (req.body.u === user.u && req.body.p === user.p) {
			res.cookie('u', user.u, { maxAge: 900000, signed: true });
			res.cookie('p', user.p, { expires: new Date(Date.now() + 900000), signed: true });
			res.sendStatus(200);
		} else {
			res.sendStatus(403);
		}
	});

	connection.end();
});

module.exports = router;