var express = require('express');
var router = express.Router();
let qs = require('querystring');

// 缓存获取的数据
let data;

/* GET home page. */
router.get('/', (req, res, next) => {
	// console.log(data);
	// console.log(req.query.page)
	// console.log(req.signedCookies);

	let un = '5797f6a0224d32232a86f80b8820d36193d79d81',
	pw = '8f154ceb9ea112463701d63907cda1b8a2c74111';
	let isLogin = 0;
	if (req.signedCookies.u === un && req.signedCookies.p === pw) {
		isLogin = 1;
	}

	let page = req.query.page;
	let articles = [
			{
				id: 1,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 2,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 3,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 4,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 5,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 6,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 7,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 8,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 9,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 10,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
			{
				id: 11,
				title: '测试用标题',
				time: '2016.9.25',
				articlePreview: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus.'
			},
		]
	let pn = Math.ceil(articles.length / 10);
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

	data = {
		title: 'Blog',
		isLogin: isLogin,
		page: pn,
		articles: articles
	}
	if (!req.query.page) {
		res.redirect('/?page=1');
	} else {
		res.render('index', data);
	}
});

module.exports = router;
