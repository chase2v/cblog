var express = require('express');
var router = express.Router();
let db = require('../db.js');
let fs = require('fs');

/* GET writing page. */
router.get('/', function(req, res, next) {
	res.render('./pages/writing', { title: 'Writing' });
});

router.post('/submit/:action', function (req, res, next) {

	let content = '&*&' + req.body.title + '&*&' + req.body.date + '&*&' + req.body.preview + '&*&' + req.body.article;

	fs.writeFile('D:/Workspace/blog/public/temp/article.txt', content, (err) => {
		if (err) console.log(err);

		db('load data local infile "D:/Workspace/blog/public/temp/article.txt" into table article fields terminated by "&*&"').then(rt => {
			res.sendStatus(200);
		}, err => {
			console.log(err)
		})
	});

});

module.exports = router;