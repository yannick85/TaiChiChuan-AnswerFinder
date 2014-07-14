var dao = require('../dao/dao'); 

this.getTccResults = function(firstLetter, letters, callback) {
	if (firstLetter.length > 1) {
		firstLetter = '[' + firstLetter + ']';
	}
	var regex = '^'+firstLetter;
	for(var letter in letters)
	{
		regex += '(?=.*';
		for(var i = 0; i < letters[letter]; i++) {
			if (letter.length > 1) {
				regex += '['+letter+'].*';
			} else {
				regex += letter+'.*';
			}
		}
		regex += ')';
	}
	regex += '.*$';
	
	console.log(regex);
	var query = 'SELECT rich FROM word WHERE match ~ \''+ regex +'\';';
	
	dao.query(query, function(result){
		var jsonObject = {};
		for(var i = 0; i < result.rowCount; i++) {
			jsonObject[i] = result.rows[i].rich;
		}
		callback(JSON.stringify(jsonObject));
	});
}
