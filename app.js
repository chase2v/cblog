var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let http = require('http');
let qs = require('querystring');
let url = require('url');
let db = require('./db.js');
let fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');
var login = require('./routes/login');
var admin = require('./routes/admin');
var writing = require('./routes/writing');
var articles = require('./routes/articles');
var submit = require('./routes/submit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('cheney3w'));
app.use(require('node-sass-middleware')({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/article', article);
app.use('/login', login);
app.use('/admin', admin);
app.use('/admin/writing', writing);
app.use('/admin/articles', articles);
app.use('/submit/', submit);
app.get('/signout',function (req, res, next) { 
	res.clearCookie('u');
	res.clearCookie('p');
	res.redirect('/');
});
app.post('/duoshuo', (req, res, next) => {
	let getData = qs.stringify({
		short_name: 'wchen',
		secret: '233f0fee2b1169d650ab3a0d01ee5cd3',
		since_id: 0,
		limit: 50,
		order: 'asc'
	});
	// let obj = url.parse('http://api.duoshuo.com/log/list.json');
	let options = {
		hostname: 'api.duoshuo.com',
		path: '/log/list.json?' + getData,
		method: 'GET'
	}

	let request = http.request(options, (res) => {
		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		})
		res.on('end', () => {
			data = JSON.parse(data);
			// console.log(data.response);
			let str = '';
			let arr_create = [],
			arr_delete = [];

			data.response.forEach(v => {
				if (v.action === 'create') {
					let meta = v.meta;
					let arr = [];
					arr.push(
						0,
						meta.post_id,
						meta.thread_key,
						meta.author_name,
						meta.author_email,
						meta.author_url,
						meta.ip,
						meta.created_at,
						meta.message,
						meta.parent_id
					);
					arr_create.push(arr);
				} else if (v.action === 'delete-forever') {
					arr_delete = v.meta;
				}
			});

			arr_create.forEach(v=>{
				str += v.join('\t');
				str += '\n';
			});
			fs.writeFileSync('./comment.txt', str);

			arr_delete = arr_delete.join(' or post_id = ');
			console.log(arr_delete);

			// 进行数据库操作
			db('load data local infile "D://Workspace/blog/comment.txt" into table comment(id,post_id,article_id,name,mail,url,ip,time,content,parent_id)').then(n=>{
				console.log(`增加了${n}条评论！`);
				db('delete from comment where post_id = '+ arr_delete).then(n=>{
					console.log(`删除了${n}条评论！`);
				}, err=>{
					console.log(err);
				});
			}, err=>{
				console.log(err);
			});
		})
	});
	request.on('error', (e) => {
		console.log(e);
	});
	request.end();

	res.sendStatus(200);
});
app.delete('/delete/:type/:id',(req, res) => {
	let type = req.params.type,
	id = req.params.id,
	query = 'delete from ' + type + ' where id = ' + id;
	db(query).then(n=>{
		res.send(''+n);
	}, err=>{
		res.send(err);
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
