var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
	res.render('./pages/login', { title: 'Login' });
});

router.post('/', function (req, res, next) {
	console.log(req.body);
	let un = '5797f6a0224d32232a86f80b8820d36193d79d81',
	pw = '8f154ceb9ea112463701d63907cda1b8a2c74111';
	if (req.body.u === un && req.body.p === pw) {
		res.cookie('u', un, { maxAge: 900000, signed: true });
		res.cookie('p', pw, { expires: new Date(Date.now() + 900000), signed: true });
		res.redirect('/admin');
	}
});

module.exports = router;