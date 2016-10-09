let mysql = require('mysql');

module.exports = (query) => {
	return new Promise((resolve, reject) => {
		let connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'blog'
		});

		connection.connect();

		connection.query(query, (err, rows, fields) => {
			if (err) reject(err);
			if (rows.affectedRows) resolve(rows.affectedRows);
		});

		connection.end();
	});
}