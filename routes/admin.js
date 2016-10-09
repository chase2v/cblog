var express = require('express');
var router = express.Router();

/* GET admin-home page. */
router.get('/', function(req, res, next) {
	let un = '5797f6a0224d32232a86f80b8820d36193d79d81',
	pw = '8f154ceb9ea112463701d63907cda1b8a2c74111';
	if (req.signedCookies.u === un && req.signedCookies.p === pw) {
		res.render('./pages/admin', { title: 'Admin' });
	} else {
		res.sendStatus(403);
	}
});

module.exports = router;