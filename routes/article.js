var express = require('express');
var router = express.Router();

/* GET article page. */
router.get('/:id', function(req, res, next) {
	console.log(req.params);
	res.render('./pages/article', { title: 'article', id: req.params.id });
});

module.exports = router;