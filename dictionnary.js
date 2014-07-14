var fs = require('fs');
var dao = require('./dao/dao');
var diacritics = require('./util/diacritics');

console.log('start dictionnary generation');



dao.query('DELETE FROM word', function () {
	console.log('Database cleared');
	var query = '';
	fs.readFile('./dic.txt', 'utf-8', function(err, data) {
		if(err) throw err;
		var array = data.toString('utf-8').replace(/^\uFEFF/, '').split("\n");
		for(i in array) {
			var word = array[i];
			var cleanword = diacritics.removeDiacritics(word);
			query += 'INSERT INTO word(match,rich) VALUES(\'' + cleanword + '\',\'' + word + '\'); ';
		}
		dao.query(query, function () {
			console.log('end dictionnary generation');
		});
	});
});




