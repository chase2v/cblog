var express = require('express');
var router = express.Router();

/* GET writing page. */
router.get('/', function(req, res, next) {
  res.render('./pages/writing', { title: 'Writing' });
});

module.exports = router;